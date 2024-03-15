import { FaWalking } from "react-icons/fa";
import { PiBicycleBold } from "react-icons/pi";
import { LuDog } from "react-icons/lu";
import { RiToolsFill } from "react-icons/ri";

export const realtimeData = [
    {
        icon: <FaWalking />,
        amount: '211',
        percentage: '-4%',
        title: 'Pedestrians',
        iconColor: '#03C9D7',
        iconBg: '#E5FAFB',
        pcColor: 'red-600',
    },
    {
        icon: <PiBicycleBold />,
        amount: '136',
        percentage: '+23%',
        title: 'Cyclists',
        iconColor: '#FFBA00',
        iconBg: '#FFFACD',
        pcColor: 'green-600',
    },
    {
        icon: <LuDog />,
        amount: '0',
        percentage: '+38%',
        title: 'Dog Walkers',
        iconColor: 'rgb(228, 106, 118)',
        iconBg: 'rgb(255, 244, 229)',
        pcColor: 'green-600',
    },
    {
        icon: <RiToolsFill />,
        amount: '3',
        percentage: 'New Added',
        title: 'Maintenance Requests',
        iconColor: 'rgb(0, 194, 146)',
        iconBg: 'rgb(235, 250, 242)',
        pcColor: 'red-600',
    },
];