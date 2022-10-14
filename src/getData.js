const URL = 'http://localhost:8000/api/categories_json/';

export const getData = () => fetch(URL).then((res) => res.json());
