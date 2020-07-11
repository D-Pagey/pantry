import { atom, selector } from 'recoil';
import axios from 'axios';

export const currentUserState = atom({
    key: 'currentUser',
    default: 'd-pagey'
});

export const currentUserDetailsQuery = selector({
    key: 'currentUserDetails',
    get: async ({ get }) => {
        const response = await axios.get(`https://api.github.com/users/${get(currentUserState)}/events`);
        return response;
    }
});

