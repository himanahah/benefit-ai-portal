// Работа с API через axios
// import axios from 'axios'; // (импорт закомментирован для сборки)

// Имитация axios для взаимодействия с сервером
const axios = {
  get: async (url: string) => {
    // GET-запрос к API
    await new Promise(r => setTimeout(r, 500));
    return { data: { url, result: 'мок-ответ' } };
  },
  post: async (url: string, body: unknown) => {
    // POST-запрос к API
    await new Promise(r => setTimeout(r, 700));
    return { data: { url, body, result: 'мок-ответ' } };
  },
};

// Получить пользователя по id
export async function fetchUser(id: string) {
  return axios.get(`/api/users/${id}`);
}

// Получить список льгот
export async function fetchBenefits() {
  return axios.get('/api/benefits');
}

// Отправить заявку на льготу
export async function requestBenefit(userId: string, benefitId: string) {
  return axios.post('/api/benefits/request', { userId, benefitId });
} 