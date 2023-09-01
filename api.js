/**
 * API
All category : - https://openapi.programming-hero.com/api/videos/categories

ALL data by categoryId
URL Format: - https://openapi.programming-hero.com/api/videos/category/${id}

Example: - https://openapi.programming-hero.com/api/videos/category/1000
 */
const dataLoad =async ()=>{
    const jsonData = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data =await jsonData.json();
    TabData(data);
}
const TabData =(data)=>{
    
    const tabContainer =document.getElementById('tab-container');
    data.data.forEach(link =>{
        
        const newElement = document.createElement('div');
        newElement.classList ='tabs tabs-boxed'
        newElement.innerHTML =`
        <a class="tab  bg-red-500  text-white" onclick="handleVideoCategory(${link.category_id})">${link.category} </a>
        `
        tabContainer.appendChild(newElement);

    })
}

const handleVideoCategory =(data)=>{
    
    const videoData =async()=>{
        const videos =await fetch(`https://openapi.programming-hero.com/api/videos/category/${data}`);
        const video =await videos.json();
        const videoContainer = document.getElementById('video-container');
        videoContainer.textContent ='';
        video.data.forEach(videoInfo=>{
            // second to hour and minute convert
            const postedDate =videoInfo?.others?.posted_date;
            const videoDurationString=postedDate?(postedDate/3600).toString():"";
            const videoDuration =videoDurationString.split(".");
            const hour = videoDuration[0];
            const minuteString =videoDuration[1];
            const minute =minuteString?.slice(0,2);
            console.log(typeof videoDuration[1]);
            const newVideoElement =document.createElement('div');
            newVideoElement.classList ='card card-compact  bg-red-100 my-4 mx-6 h-80 shadow-xl';
            newVideoElement.innerHTML= `
            <figure class="relative">
                <img src="${videoInfo.thumbnail}" class="w-full h-52"/>
                <div class="${postedDate?'absolute right-2 bottom-2 bg-slate-800 rounded-md p-1':'hidden'}">
                    <p class="text-white">${hour}hrs ${minute}mins ago</p>
                    </div>
            </figure>
                <div class="flex m-4">
                 <img src="${videoInfo.authors[0].profile_picture
                 }" alt="" class="rounded-full w-8 h-8"> 
                  <h2 class="card-title ml-2 font-bold text-base">${videoInfo.title} </h2>
                  
                </div>
                <div>
                 <div class="flex gap-1 items-center">
                   <p class="text-base font-semibold  ml-10 text-gray-500">${videoInfo.authors[0].profile_name
                    }</p>
                    <img src='${videoInfo.authors[0].verified?"./images/check-mark.png":""}' class="w-3 h-3">
                   </div>
                <p class="text-xs text-gray-500 ml-10">${videoInfo.others.views
                }</p>
                  </div>
            `
            videoContainer.appendChild(newVideoElement);
        })
        }
        videoData()
}

dataLoad()