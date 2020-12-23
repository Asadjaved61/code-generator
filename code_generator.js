// getting span elements with promo class
const promoPlaceHolders = [...document.getElementsByClassName("promo")];
const promoCodes = [];

// getting each promo code from Api if not present in local storage
const getPromoCode = async (promoName) => {
  const code;
  if (localStorage.getItem('promoCodes')) {
    const promoCodes = JSON.parse(localStorage.getItem('promoCodes'));
    code = promoCodes.find(promo => promo.element.textContent === promoName).code;
  } else {
    await fetch(`https://your.uniqodo.com/code.php?promo-name=${promoName}`)
      .then(res => {
          code = res.code
      })
  }
  return code;
};

// saving each promo code with respective element
promoPlaceHolders.forEach((el) => {
  if (el.firstElementChild) {
    promoCodes.push({
      element: el.firstElementChild,
      code: getPromoCode(el.firstElementChild.textContent),
    });
  } else {
    promoCodes.push({
      element: el,
      code: getPromoCode(el.textContent),
    });
  }
});

// storing the codes in local storage so everytime user do not see new codes
localStorage.setItem('promoCodes', JSON.stringify(promoCodes));

// updating the UI
promoCodes.forEach((promo) => {
  promo.element.textContent = promo.code;
});
