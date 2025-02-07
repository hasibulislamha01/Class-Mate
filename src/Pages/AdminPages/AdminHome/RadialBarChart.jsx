import { RadialBarChart as RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from 'recharts';
import useGetAllUsersWithSameAttribute from '../../../CustomHooks/useGetAllUsersWithSameAttribute';





const RadialChart = () => {

    const totalMaleStudents = useGetAllUsersWithSameAttribute('Student', 'male').length
    const totalFemaleStudents = useGetAllUsersWithSameAttribute('Student', 'female').length
    const totalStudents = totalFemaleStudents + totalMaleStudents

    // console.log(totalFemaleStudents, totalMaleStudents);
    const data = [
        {
            name: 'Students',
            count: totalStudents,
            fill: '#ffffff',
        },
        {
            name: 'Girls',
            count: totalFemaleStudents,
            fill: '#fda4af',
        },
        {
            name: 'Boys',
            count: totalMaleStudents,
            fill: '#1D8BD5',
        },
    ];

    return (
        <div className='w-full h-[200px]'>
            <ResponsiveContainer  width="100%" height="100%">
                <RadialBarChart
                    cx={"50%"}
                    cy={"50%"}
                    innerRadius="40%"
                    outerRadius="100%"
                    barSize={32}
                    data={data}
                    // startAngle={180}
                    // endAngle={0}
                    className='flex flex-col'
                >
                    <RadialBar
                        minAngle={15}
                        // label={{ fill: '#666', position: 'insideStart' }}
                        background
                        clockWise={true}
                        dataKey='count'
                        isAnimationActive={true}         
                        animationBegin={0}               
                        animationDuration={1500}         
                        animationEasing="ease-out" 
                    />
                    {/* <Legend
                        iconSize={10}
                        width={120}
                        height={140}
                        layout='horizontal'
                        verticalAlign='middle'
                        align="right"
                    /> */}
                    <Tooltip />
                </RadialBarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RadialChart;