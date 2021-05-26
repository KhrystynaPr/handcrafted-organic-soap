(function() {
  const categories = [
    `<img src="img/sweet-scents.webp" class="d-block w-100" alt="Sweet scents soap">
    <h3>Sweet Scents</h3>
    <p class="notes">If you have a sweet tooth, you will love our fruit, candy, and other sweet-scent soap.</p>
    <a href="#shop-section" class="button" >Shop &#x27F6;</a>`,

    `<img src="img/herbal-soaps.webp" class="d-block w-100" alt="Herbal soap">
    <h3>Herbal Soaps</h3>
    <p class="notes">These soaps are for those who love the scent of lavander, juniper, and other herbs.</p>
    <a href="#shop-section" class="button" >Shop &#x27F6;</a>`,

    `<img src="img/problem-skin.webp" class="d-block w-100" alt="Problem skin soap">
    <h3>Problem Skin</h3>
    <p class="notes">The soap will help get rid of blackheads, as well as normalize the oil glands.</p>
    <a href="#shop-section" class="button" >Shop &#x27F6;</a>`,

    `<img src="img/sensitive-skin.webp" class="d-block w-100" alt="Sensitive skin soap">
    <h3>Sensitive Skin</h3>
    <p class="notes">We have special soaps for especially delicate skin that requires gentle care.</p>
    <a href="#shop-section" class="button" >Shop &#x27F6;</a>`
  ];

  let currentIdx = 0;

  function showCurrentSlide() {
      const slide1Container = document.querySelector('.categories-carousel .product-one');
      slide1Container.innerHTML = categories[currentIdx];

      const slide2Container = document.querySelector('.categories-carousel .product-two');
      const product2Idx = currentIdx + 1 >= categories.length ? 0 : currentIdx + 1;
      slide2Container.innerHTML = categories[product2Idx];

      const slide3Container = document.querySelector('.categories-carousel .product-three');
      const product3Idx = product2Idx + 1 >= categories.length ? 0 : product2Idx + 1;
      slide3Container.innerHTML = categories[product3Idx];
      
  }

  function prevSlide() {
      currentIdx--;
      if (currentIdx <= 0) currentIdx = categories.length - 1;
      showCurrentSlide();
  }
 function nextSlide() {
      currentIdx++;
      if (currentIdx >= categories.length) currentIdx = 0;
      showCurrentSlide();
  }
  document.querySelector('.categories-carousel .slide-prev').addEventListener('click', prevSlide);
  document.querySelector('.categories-carousel .slide-next').addEventListener('click', nextSlide);

  showCurrentSlide();
})();

