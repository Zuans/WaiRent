const allBtnAction=document.getElementsByClassName("btn-action"),allWrapper=document.getElementsByClassName("content-wrapper"),showContent=document.getElementsByClassName("show-content")[0];[...allBtnAction].forEach((e=>e.addEventListener("click",changeFormWrapper)));const btnEditTag=document.getElementById("btn-edit-tag");btnEditTag.addEventListener("click",changeTag);const formChangePass=document.getElementById("form-change-password");formChangePass.addEventListener("submit",changePass);const formEditProfile=document.getElementById("change-profile");function changeFormWrapper(e){const t=e.srcElement.dataset.btnForm;[...allWrapper].forEach((e=>{const n=e.dataset.form;if(t===n)return e.classList.remove("hide-wrapper"),void showContent.insertAdjacentElement("afterbegin",e);e.classList.add("hide-wrapper")}))}async function changeTag(){const e={allTag:selectedTag};try{const t=`${BASE_URL_API}/user/tag`,n=await fetch(t,{method:"PATCH",headers:{"Content-type":"application/json"},body:JSON.stringify(e)}),{status:a,msg:s}=await n.json();if("success"!==a)throw new Error(s);const o=document.getElementById("alert-update-tag");o.innerHTML="Tag has updated",o.classList.add("alert-success")}catch(e){console.log(e)}}async function changePass(e){e.preventDefault();const t={"current-password":document.getElementById("current-password").value,"new-password":document.getElementById("new-password").value,"confirm-password":document.getElementById("confirm-password").value},n=document.getElementById("alert-change-password");try{const e=`${BASE_URL_API}/user/password`,a=await fetch(e,{method:"PATCH",headers:{"Content-type":"application/json"},body:JSON.stringify(t)}),{status:s,message:o}=await a.json();if("success"!==s)return setError("change-pass",o,n);const r=document.getElementById("alert-change-password");r.innerHTML="Change password success",r.classList.add("alert-success")}catch(e){console.log(e)}}async function editProfile(e){e.preventDefault();const t={username:document.getElementById("username").value,email:document.getElementById("email").value,password:document.getElementById("password").value,age:document.getElementById("age").value},n=document.getElementById("alert-edit-profile");try{const e=`${BASE_URL_API}/user`,a=await fetch(e,{method:"PATCH",headers:{"Content-type":"application/json"},body:JSON.stringify(t)}),{status:s,message:o}=await a.json();if(console.log(s),"success"!==s)return setError("edit-profile",o,n);n.textContent=o,n.classList.contains("alert-error-white")&&n.classList.remove("alert-error-white"),n.classList.add("alert-success")}catch(e){console.log(e)}}function setError(e,t,n){if(clearErrorAndAlert(n),"string"==typeof t)return n.classList.add("alert-error-white"),n.textContent=t;t.map((t=>{const n=`err-${e}-${t.param}`,a=document.getElementById(n);a.innerHTML=" ";const s=document.createElement("p"),o=document.createTextNode(t.msg);s.appendChild(o),a.appendChild(s)}))}function clearErrorAndAlert(e){[...document.getElementsByClassName("error-input")].forEach((e=>e.innerHTML="")),e.innerHTML=""}formEditProfile.addEventListener("submit",editProfile),window.addEventListener("DOMContentLoaded",(async()=>{const e=`${BASE_URL_API}/user/tag`;try{const t=await fetch(e,{method:"GET"}),{data:n}=await t.json();n.map(((e,t)=>{selectedTag[t]={value:e.value,textContent:e.name}}));const a=createChildTag(selectedTag);setChildTag(tagWrapper,a)}catch(e){console.log(e)}}));
//# sourceMappingURL=editProfile.js.map