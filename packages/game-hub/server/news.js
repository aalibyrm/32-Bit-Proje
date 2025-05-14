import axios from 'axios';
import * as cheerio from 'cheerio';

export const getNews = async () => {
    const url = 'https://www.webtekno.com/oyun';
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const items = [];

    $('.content-timeline__item').each((i, el) => {
        const $item = $(el);
        const time = $item.find('time').attr('datetime');
        const link = $item.find('.content-timeline__media a').attr('href');
        const title = $item.find('.content-timeline__detail__title').text().trim();
        const image = $item.find('.content-timeline__media__image').attr('src') || $item.find('.content-timeline__media__image').attr('data-original');

        items.push({
            time,
            title,
            link,
            image: image || null
        });
    });

    return items;
};