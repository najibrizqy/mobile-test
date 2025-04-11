interface JokeFlags {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
}

interface Joke {
    category: string;
    type: string;
    joke: string;
    flags: JokeFlags;
    id: number;
    safe: boolean;
    lang: string;
}

interface JokeResponse {
    error: boolean;
    amount: number;
    jokes: Joke[];
}

interface CategoriesResponse {
    error: boolean;
    categories: string[];
    categoryAliases: Array<{
        alias: string;
        resolved: string;
    }>;
    timestamp: number;
}

const BASE_URL = 'https://v2.jokeapi.dev';

export const getJokeCategories = async (): Promise<string[]> => {
    try {
        const response = await fetch(`${BASE_URL}/categories`);
        const data: CategoriesResponse = await response.json();
        return data.categories;
    } catch (error) {
        console.error('Error fetching joke categories:', error);
        return [];
    }
};

export const getJokes = async (category: string = 'Pun', amount: number = 2): Promise<Joke[]> => {
    try {
        const response = await fetch(`${BASE_URL}/joke/${category}?type=single&amount=${amount}`);
        const data: JokeResponse = await response.json();
        return data.jokes;
    } catch (error) {
        console.error('Error fetching jokes:', error);
        return [];
    }
};