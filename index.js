async function get_stuff(idCounter) {
  const url = new URL(window.location.href);
  const isNSFW = url.search.includes('nsfw') ? 'true' : 'false';
  const resp = await fetch('https://api.waifu.im/random/?is_nsfw='+isNSFW+'&orientation=PORTRAIT&many=true');
  const links = await resp.json();
  links.images.forEach((link) => {
    const element = document.createElement('div');
    element.className = 'slide';
    element.id = '' + idCounter + links.images.indexOf(link);
    const img = document.createElement('img');
    img.src = link.url;
    element.appendChild(img);
    document.getElementById('slides-container').appendChild(element);
  });
}


function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

let idCounter = 0;
onload = async (event) => {
  await get_stuff(idCounter);
  document.getElementById('slides-container').onmouseover = async () => {
    const ele = document.getElementById('' + idCounter + 28);
    if (isInViewport(ele)) {
      // the desired place
      idCounter++;
      await get_stuff(idCounter);
    }
  }
};





