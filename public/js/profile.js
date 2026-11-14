// get JWT Token
const token=localStorage.getItem("token")

// Cheak login
if(!token){
    window.location.href="login.html";
}

// featch user Profile
async function loadProfile(){
    try{
        const response=await fetch("/api/auth/profile",{
            method:"GET",
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        const data=await response.json();

        if(!response.ok){
            localStorage.removeItem("token")
            window.location.href="login.html"
            return;
        }

        // Display user Details
        document.querySelector("#profile-name").textContent=data.user.fullname;
        document.querySelector("#profile-email").textContent=data.user.email;
        document.querySelector("#profile-mobile").textContent=data.user.mobile;

}catch(error){
    console.error("Profile Error:",error);
    alert("Unable to load profile.Plase try again.");
}
}
loadProfile();

// logout functionality
const logoutBtn=document.querySelector("#logout-btn");

logoutBtn.addEventListener("click",()=>{
    localStorage.removeItem("token");
    alert("Logout successfull!")
    window.location.href="login.html";
})