export const getStorage = (storageItem) => {
  return JSON.parse(localStorage.getItem(storageItem)) || '';
};

export const setStorage = (itemToStore) => {
  localStorage.setItem('searchResponses', JSON.stringify(itemToStore));
};

export const clearStorage = () => {
  localStorage.clear();
  window.location.reload();
};
