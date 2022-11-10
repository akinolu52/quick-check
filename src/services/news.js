import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setNews } from '../slice/news';
import { API_ROUTES, BASE_URL } from '../utils';
import Storage from "../utils/useStorage";

const { getItem, setItem } = Storage();

const fetchData = ROUTE => fetch(ROUTE);

const mapItem = async (id) => {
    const result = await fetchData(BASE_URL + API_ROUTES.STORY.replace(':itemId', id));
    const body = await result.json();
    return body;
}

export const newsApi = createApi({
    reducerPath: "news",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    }),
    endpoints: build => ({
        getStories: build.query({
            async queryFn(_arg, _queryApi, _extraOptions, fetchData) {

                const allStories = await fetchData(BASE_URL + API_ROUTES.STORIES);
                if (allStories.error) return { error: allStories.error };

                // console.log('allStories ', allStories.data.length);
                const stories = await Promise.all(allStories.data.map(async id => await mapItem(id)));
                return Array.isArray(stories) ? { data: stories } : { error: stories.error }
            },
        }),
        getTopStories: build.query({
            async queryFn(_arg, _queryApi, _extraOptions, fetchData) {
                // const previousStories = _queryApi?.getState()?.news?.queries

                // console.log('previousStories ', previousStories)

                let topStories;

                // get top stories
                const _topStories = await getItem('qTopStories') || [];
                // console.log('_topStories ', _topStories);

                if (_topStories?.length > 0) {
                    topStories = _topStories
                } else {
                    const ts = await fetchData(BASE_URL + API_ROUTES.TOP_STORIES);
                    if (ts.error) return { error: ts.error };

                    topStories = ts.data;
                    await setItem('qTopStories', topStories);
                }


                // save topStories
                const end = _arg * 20;


                const stories = await Promise.all(topStories.slice(end - 20, end).map(async id => await mapItem(id)));
                _queryApi?.dispatch(setNews({ news: stories }));

                const updatedStories = _queryApi?.getState()?.newsSlice?.news;
                // console.log(_arg, updatedStories);

                return Array.isArray(updatedStories) ? { data: updatedStories } : { error: stories.error }
            },
        }),
        getStory: build.query({
            query: id => API_ROUTES.STORY.replace(':itemId', id),
        }),
    }),
});

export const {
    useGetStoriesQuery,
    useGetTopStoriesQuery,
    useGetStoryQuery,
} = newsApi;