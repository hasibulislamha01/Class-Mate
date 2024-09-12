import React, { PureComponent } from 'react';
import { RadialBarChart as RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import useUserCount from '../../../CustomHooks/useUserCount';
import useGetAllUsersWithSameRole from '../../../CustomHooks/useGetAllUsersWithSameRole';



const style = {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
};

const RadialChart = () => {

    const totalStudents = useGetAllUsersWithSameRole('Student')
    // console.log(totalStudents); ok

    const data = [
        {
            name: 'Boys',
            count: 31.47,
            fill: '#8884d8',
        },
        {
            name: 'Girls',
            count: 26.69,
            fill: '#83a6ed',
        }
    ];

    return (
        <RadialBarChart
            width={530}
            height={250}
            innerRadius="40%"
            outerRadius="80%"
            data={data}
            startAngle={180}
            endAngle={0}
            className='border border-red-500 flex flex-col'
        >
            <RadialBar
                minAngle={15}
                // label={{ fill: '#666', position: 'insideStart' }}
                background
                clockWise={false}
                dataKey='count'
            />
            <Legend
                iconSize={10}
                width={120}
                height={140}
                layout='horizontal'
                verticalAlign='middle'
                align="right"
            />
            <Tooltip />
        </RadialBarChart>
    );
};

export default RadialChart;