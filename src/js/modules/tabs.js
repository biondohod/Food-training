//Tabs
const tabContentList = document.querySelectorAll('.tabcontent'),
tabSelectors = document.querySelector('.tabheader__items'),
tabSelectorsList = tabSelectors.querySelectorAll('.tabheader__item');

const hideTabds = () => {
tabContentList.forEach((item) => {
  item.classList.add('hidden');
  item.classList.remove('fade');
})
tabSelectorsList.forEach((item) => {
  item.classList.remove('tabheader__item_active')
})
};
const showSelectedTab = (index = 0) => {
tabContentList[index].classList.remove('hidden');
tabContentList[index].classList.add('fade');
tabSelectorsList[index].classList.add('tabheader__item_active');
}
hideTabds();
showSelectedTab();
tabSelectors.addEventListener('click', (evt) => {
const target = evt.target;
if (target && target.classList.contains('tabheader__item')) {
  tabSelectorsList.forEach((item, index) => {
      if (target === item) {
          hideTabds();
          showSelectedTab(index);
      }
  });
}
});