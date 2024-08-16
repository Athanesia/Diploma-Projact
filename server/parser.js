const axios = require('axios');
const cheerio = require('cheerio');

const urls = {
    'Ржевка': 'http://example.com/rzhevka', // Замените на реальный URL
    'Потеряшка': 'http://example.com/poteryashka', // Замените на реальный URL
    'Рыжий кот': 'https://rigiykot.10ki.biz/all',
    'Новый дом': 'https://newdomcat.ru/%D0%BA%D0%BE%D1%88%D0%BA%D0%B8-%D0%B8-%D0%BA%D0%BE%D1%82%D1%8B/',
    'Брошенный ангел': [
        'https://bfba.ru/sobaki/',
        'https://bfba.ru/koshki/kotyata/',
        'https://bfba.ru/koshki/vzroslyie/',
        'https://bfba.ru/koshki/starichki/'
    ],
    'Островок надежды': 'http://example.com/ostrovok-nadezhdy', // Замените на реальный URL
    'Островок': 'http://example.com/ostrovok', // Замените на реальный URL
    'Преданное сердце': 'http://example.com/predannoe-serdtse', // Замените на реальный URL
    'Верный друг': 'https://priut.ru/catalog/pets'
};

async function fetchAnimals(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        // Здесь необходимо настроить парсинг данных в зависимости от структуры HTML на странице
        return $('selector-for-animal-items').map((i, el) => ({
            name: $(el).find('selector-for-name').text(),
            image: $(el).find('selector-for-image').attr('src'),
            link: $(el).find('selector-for-link').attr('href')
        })).get();
    } catch (error) {
        console.error(`Error fetching ${url}:`, error);
        return [];
    }
}

async function getAllAnimals() {
    const allAnimals = [];
    for (const [shelter, url] of Object.entries(urls)) {
        if (Array.isArray(url)) {
            for (const u of url) {
                allAnimals.push(...await fetchAnimals(u));
            }
        } else {
            allAnimals.push(...await fetchAnimals(url));
        }
    }
    return allAnimals;
}

module.exports = { getAllAnimals };