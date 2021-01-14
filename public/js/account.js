let accountID;
let userID;
$(document).ready(() => {
    //id tài khoản user
    userID=$('#account-id').text();

    let pTagContent = $("#user-info").html();
    //id tài khoản cá nhân
    accountID = pTagContent.split(">")[1].split("<")[0];
    console.log(accountID);
    console.log(userID);
    set_lock_unlock_button();

});

async function LockAccount()
{
    console.log(accountID);
    console.log(userID);
    await $.ajax({
        url: "/users/profile/lock-account",
        method:"POST",
        data:{
            accountID:accountID,
            userID:userID,
        },
        statusCode: 
        {
            202: (res)=>{
                $("#btnLockAccount").css("display","none");
                $("#btnUnlockAccount").css("display","block");
                document.getElementById('div-is-locked').innerHTML="<p>Bị khóa</p>";      
                $("#is-locked").text('Bị khóa');
            },
            204: (res)=>{
                $("#btnLockAccount").css("display","block");
                $("#btnUnlockAccount").css("display","none");     

                document.getElementById('div-is-locked').innerHTML="<p>Bình thường</p>";      
                $("#is-locked").text('Bình thường');
            }
        },
      });
}

async function UnlockAccount()
{
    console.log(accountID);
    console.log(userID);
    await $.ajax({
        url: "/users/profile/unlock-account",
        method:"POST",
        data:{
            accountID:accountID,
            userID:userID,
        },
        statusCode: 
        {
            202: (res)=>{
                $("#btnLockAccount").css("display","block");
                $("#btnUnlockAccount").css("display","none");
                document.getElementById('div-is-locked').innerHTML="<p>Bình thường</p>";      

                $("#is-locked").text('Bình thường');
            },
            204: (res)=>{
                $("#btnLockAccount").css("display","none");
                $("#btnUnlockAccount").css("display","block");
                document.getElementById('div-is-locked').innerHTML="<p>Bị khóa</p>";      

                $("#is-locked").text('Bị khóa');
            }
        },
    
      });
}

function set_lock_unlock_button()
{
    //không được tài khoản của chính mình
    if(userID==accountID)
    {
        $("#btnLockAccount").css("display","none");
        $("#btnUnlockAccount").css("display","none");
        $("#change-avatar").css("display","block");
    }
    else
    {
        //mở khóa và khóa tài khoản users
        const isLocked= $("#is-locked").text();
        if(isLocked==true){// tài khoản đã bị khóa
        $("#btnLockAccount").css("display","none");
        $("#btnUnlockAccount").css("display","block");
        }
        else if(isLocked==false)//tài khoản bình thường
        {
            $("#btnLockAccount").css("display","block");
            $("#btnUnlockAccount").css("display","none");
        }
    }

    //admin không được xóa super_admin và admin khác
    pTagContent=$("#user-role").html();
    const user_is_admin=pTagContent.split(">")[1].split("<")[0];
    if((user_is_admin=="Admin" ||user_is_admin=="Super Admin"))
    {
        $("#btnLockAccount").css("display","none");
        $("#btnUnlockAccount").css("display","none");
    }

    //super_admin được xóa admin
    const account_is_super_admin=$("#account-role").text();
    if(account_is_super_admin=="true" && accountID!=userID)
    {   
        $("#btnLockAccount").css("display","block");
        $("#btnUnlockAccount").css("display","none");
    }
}