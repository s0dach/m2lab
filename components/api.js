import axios from "axios";
import {formatDate} from "@/components/utils.js";
export const fetchLeadCards = async () => {
    try {
        const response = await axios.get('https://crm.m2lab.ru/api/internal/demo/demoLeadCardAccess');

        const managerList = response.data.reference?.managerList ?? [];
        const leadBoards = response.data.reference?.leadBoards ?? [];
        const leadSources = response.data.reference?.leadSources ?? [];

        const transformedManagerList = managerList.map(person => ({
            label: person.name,
            avatar: {
                src: person.avatar || ''
            }
        }));

        const transformLeadBoards = leadBoards.map(board => ({
            label: board.title,
        }));

        const transformLeadSources = leadSources.map(board => ({
            label: board.title,
        }));
        console.log(response)
        const leadDate = response.data.leadData;
        const leadReference = {
            ...response.data.reference,
            managerList: transformedManagerList,
            leadBoards: transformLeadBoards,
            leadSources: transformLeadSources
        };
        const manager = response.data.reference.managerList.find(item => item.id === leadDate.manager);
        const channel = response.data.reference.leadSources.find(item => item.id === leadDate.leadSource);

        return {
            leadDate,
            leadReference,
            manager,
            channel
        }
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}

export const saveBoard = (leadDate, manager, date) => {
    const data = {
        "createdAt": formatDate(date),
        "manager": manager,
        "leadStatus": leadDate.leadStatus,
        "leadSource": leadDate.leadSource,
        "board": leadDate.board,
        "leadName": leadDate.leadName,
        "object": {
            "object": leadDate.object,
            "rooms": leadDate.rooms,
            "objectNumber": leadDate.objectNumber,
        },
        "contacts": {
            "phone": leadDate.contacts.phone,
            "withoutPhone": false,
            "email": leadDate.contacts.email,
            "socialType": leadDate.contacts.socialType,
            "nickName": leadDate.contacts.nickName,
            "additionalContacts": [
                {
                    "contact": leadDate.contacts.additionalContacts[0].contact,
                    "description": leadDate.contacts.additionalContacts[0].description
                }
            ]
        }
    }
    try {
        const response = axios.post('https://crm.m2lab.ru/api/internal/demo/demoLeadCardAccess', data).then(res => console.log(res))
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    } finally {
        //   тут обработку
    }

}