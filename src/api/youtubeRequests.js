import axios from 'axios';

import { KEY } from './.key.js'


const baseURL = 'https://www.googleapis.com/youtube/v3';

export const searchRequest = (query) => {
    const getId = async () =>{
        const video = await axios.get(baseURL + '/search', {
            params: {
                q: query, 
                key: KEY,
                part: 'snippet',
                maxResults: 1,
                type: 'video'
            }
        })
        return video
    } 
    return getId();

}

export const videosRequest = (idVideo) => {
    const getData = async () =>{
        const primaryVideo = await axios.get(baseURL + '/videos', {
            params: {
                id: idVideo, 
                key: KEY,
                part: 'snippet'
            }
        })
        // Max results en 3 a veces devuelve 2
        const relatedVideo = await axios.get(baseURL + '/search', {
            params: {
                relatedToVideoId: idVideo,
                key: KEY,
                part: 'snippet',
                type: 'video',
                maxResults: 4
            }})
        return([{ 
            primary: primaryVideo.data,
            related: relatedVideo.data
        }]); 
    }
    return getData();

}