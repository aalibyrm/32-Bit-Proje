import axios from 'axios';
import * as cheerio from 'cheerio';

export const getNews = async () => {
    const url = 'https://shiftdelete.net/oyun';
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const items = [];

    $("#tdi_69 .tdb_module_loop").each((i, el) => {
        const $item = $(el);

        // Extract time (datetime attribute or text)
        const time = $item.find('time').attr('datetime') || $item.find('.td-post-date').text().trim();

        // Extract link from either the image or title
        const link = $item.find('.td-module-thumb a').attr('href') ||
            $item.find('.td-module-title a').attr('href');

        // Extract title
        const title = $item.find('.td-module-title a').attr('title') ||
            $item.find('.td-module-title a').text().trim();

        // Extract image - checking both data-img-url and style background-image
        let image = $item.find('.td-thumb-css').attr('data-img-url') ||
            $item.find('.td-thumb-css').attr('data-img-retina-url');

        // If not found in data attributes, check the style attribute
        if (!image) {
            const style = $item.find('.td-thumb-css').attr('style');
            if (style) {
                const match = style.match(/url\(["']?(.*?)["']?\)/);
                if (match) image = match[1];
            }
        }

        // Extract excerpt/description
        const excerpt = $item.find('.td-excerpt').text().trim();

        if (time) {
            items.push({
                time,
                title,
                link,
                image: image || null,
            });
        }
    });

    return items;
};