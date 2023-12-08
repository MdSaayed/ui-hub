var loadeData = async () => {
    loadingSpinner(true);
    const res = await fetch(' https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const ai = data.data.tools;
    displayAi(ai);
    loadingSpinner(false);

}
loadeData();

const displayAi = (ai) => {
    const aiContainer = document.getElementById('ai-container');
    ai.forEach(ai => {
        const div = document.createElement('div');
        div.setAttribute('onclick', `showDetails(${ai.id})`);
        div.classList = `p-4 border rounded-lg`;
        div.innerHTML = `
            <div class="featured-imge">
                <img class='w-full h-[15rem]' src="${ai.image ? ai.image : './placeholder.png'}">
            </div>
            <div class="featured-text">
                <h2 class="text-2xl font-semibold">Features</h2>
                <ol><li>${ai.features}</li></ol>
                <div class="brand mt-2 border-t-2 pt-2">
                    <h2 class="font-semibold">${ai.name}</h2>
                    <p>${ai.published_in}</p>
                </div>
            </div>
        `;
        aiContainer.appendChild(div);
    });
}

// 
const showDetails = async (id) => {
    let popup = document.getElementById('single-product-popup');
    let res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    let datas = await res.json();
    let aiData = datas.data;
    const features = aiData.features;
    let featureItem = [];

    // feature container select
    for (const key in features) {
        if (features.hasOwnProperty(key)) {
            const feature = features[key];
            featureItem.push(feature.feature_name);
        }
    }
    
    popup.style.display = 'flex';

    popup.innerHTML = `
    <div class="details-box grid grid-cols-2 gap-4">
    <div class="details-text bg-[#f7b0b028] p-4 rounded">
        <h2 class="text-2xl font-semibold">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Repellendus,
            inventore.</h2>
        <div class="grid grid-cols-3 gap-4 my-8">
            <div class="bg-white p-2 text-center text-xs rounded text-green-500">$10/<br>month<br>Basic</div>
            <div class="bg-white p-2 text-center text-xs rounded text-orange-500">$10/<br>month<br>Basic</div>
            <div class="bg-white p-2 text-center text-xs rounded text-red-400">$10/<br>month<br>Basic</div>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div>
                <h2 class="text-2xl font-semibold">Features</h2>
                <ul id='feature-items' class='feature-items'>${featureItem?.map((item)=>{
                    return `<li>${item.slice(0,item.length-1)}</li>`;
                })}</ul>
            </div>
            <div>
                <h2 class="text-2xl font-semibold">Integrations</h2>
            </div>
        </div>
    </div>
    <div class="text-center border rounded p-4">
        <img src="${aiData.image_link}" alt="">
        <h2 class="text-2xl font-semibold mt-4">${aiData.tool_name}</h2>
        <p>${aiData.description}</p>
    </div>
</div>
    `;

}


// spinner
function loadingSpinner(status) {
    let loadingSpinner = document.getElementById('loading-container');
    if (status) {
        loadingSpinner.style.display = 'flex';
    } else {
        loadingSpinner.style.display = 'none';
    }
}







