async function get_stuff(idCounter) {
  const url = new URL(window.location.href);
  const isNSFW = url.search.includes('nsfw');
  const resp = await fetch('https://api.waifu.im/random/?is_nsfw='+isNSFW+'&orientation=PORTRAIT&many=true');
  const links = await resp.json();
  console.table(links.images);
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

var isInViewport = function (elem) {
  var bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};


let idCounter = 0;
onload = async (event) => {
  console.log('Loadded');
  await get_stuff(idCounter);
  document.getElementById('slides-container').addEventListener('scroll', function(event) {
    console.log('scrolled');
  });
};





