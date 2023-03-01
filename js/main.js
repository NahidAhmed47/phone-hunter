document.getElementById('search-btn').addEventListener('click', function(){
    processSearch(8);
})
// enter key event
document.getElementById('input-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      processSearch(8)
    }
});
const loadPhoneData = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data, dataLimit);
}
const displayData = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = '';
    // display short data
    const seeMoreBtn = document.getElementById('see-more-btn');
    if(dataLimit && phones.data.length > dataLimit){
        phones.data =  phones.data.slice(0, dataLimit);
        seeMoreBtn.classList.remove('hidden');
    }
    else{
        seeMoreBtn.classList.add('hidden');
    }
    const searchWarning = document.getElementById('search-warning');
    // Search warning
    if(phones.data.length <= 0){
        searchWarning.classList.remove('hidden');
    }
    else{
        searchWarning.classList.add('hidden');
    }

    phones.data.forEach(phone =>{
        const div = document.createElement('div');
        div.classList.add('border', 'p-5', 'bg-white');
        div.innerHTML =`
          <img class="mx-auto" src="${phone.image}" alt="">
          <h1 class="text-xl font-bold mt-3">${phone.phone_name}</h1>
          <h3 class="text-sm font-bold">Brand: <span>${phone.brand}</span></h3>
          <p class="text-xs font-semibold">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi nobis mollitia repellat totam quo!</p>
          <label for="my-modal-3" class="underline text-sm text-[#EA489B] font-medium cursor-pointer" onclick="singlePhoneData('${phone.slug}')">See details</label>
    `;
    phoneContainer.appendChild(div);
    })
    loading(false);
}
// loading progress 
const loading = isLoading =>{
    const loading = document.getElementById('loading');
    if(isLoading){
        loading.classList.remove('hidden');
    }
    else{
        loading.classList.add('hidden');
    }
}
// process search
const processSearch = (dataLimit) => {
    let value = 'samsung';
    const inputValue = document.getElementById('input-field').value;
    if(inputValue != ''){
        value = inputValue;
        loadPhoneData(value, dataLimit);
    }
    else{
        loadPhoneData(value, dataLimit);
    }
    loading(true);
}
// see more data btn 
document.getElementById('see-more').addEventListener('click', function(){
    processSearch();
})
loadPhoneData('samsung', 8); 

// display single phone data
const singlePhoneData = async(phoneId) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    const res = await fetch(url);
    const data = await res.json();
    displaySinglePhoneDetails(data.data);
}
const displaySinglePhoneDetails = (details) =>{
    console.log(details);
    const modalBox = document.getElementById('modal-box');
    modalBox.innerHTML = `
         <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <img class="mx-auto" src="${details.image}" alt="">
          <h1 class="text-xl font-bold mt-3">${details.name}</h1>
          <h3 class="text-sm font-bold">Brand: <span>${details.brand}</span></h3>
          <p class="text-xs font-semibold">Display Size: <span>${details.mainFeatures.displaySize}</span></p>
          <p class="text-xs font-semibold">Memory: <span>${details.mainFeatures.memory}</span></p>
          <p class="text-xs font-semibold">Bluetooth: <span>${details.others.Bluetooth}</span></p>
          <p class="text-xs font-semibold">GPS: <span>${details.others.GPS}</span></p>
          <p class="text-xs font-semibold">Release Date: <span>${details.releaseDate}</span></p>
    `;
}
