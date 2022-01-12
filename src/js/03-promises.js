import Notiflix from 'notiflix';

function createPromise(position, delay){
  const shouldResolve = Math.random() > 0.3;
  const obj = { position, delay };

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) resolve(obj);
      else reject(obj);
    }, delay);
  })
    
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
  })
    
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  });
};

const inputForm = document.querySelector('.form');

inputForm.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  let delay = parseInt(event.target.elements.delay.value);
  const step = parseInt(event.target.elements.step.value);
  const amount = parseInt(event.target.elements.amount.value);

  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay);

    delay = delay + step;
  }
};
