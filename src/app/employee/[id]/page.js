'use client';

import { useParams } from 'next/navigation';
import { useUsers } from '@/context/UserContext';
import { useContext, useMemo, useState } from 'react';
import { ThemeContext } from '@/context/ThemeContext';
import Rating from '@/components/ui/rating';
import TabButton from '@/components/ui/TabButton';
import Image from 'next/image';
const tabs = ['Overview', 'Projects', 'Feedback'];

const getRandomHistory = () => {
    const history = [];
    for (let i = 0; i < 5; i++) {
        history.push({
            year: 2019 + i,
            rating: Math.floor(Math.random() * 5) + 1
        });
    }
    return history;
};

function StatusBadge({ rating }) {
    let badgeClasses = 'inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ';
    let label = '';

    if (rating >= 4) {
        badgeClasses += 'bg-green-500 text-white';
        label = 'Excellent';
    } else if (rating >= 3) {
        badgeClasses += 'bg-yellow-400 text-black';
        label = 'Good';
    } else {
        badgeClasses += 'bg-red-500 text-white';
        label = 'Needs Improvement';
    }

    return <span className={badgeClasses} aria-label={`Performance status: ${label}`}>{label}</span>;
}

export default function EmployeeDetailPage() {
    const { id } = useParams();
    const { users } = useUsers();
    const { theme } = useContext(ThemeContext);
    const [activeTab, setActiveTab] = useState('Overview');

    if (!users) return <p className="mt-10 text-center">Loading users...</p>;

    const user = users.find(u => u.id === Number(id));
    const history = useMemo(() => getRandomHistory(), [id]);

    if (!user) return <p className="mt-10 text-center">User not found.</p>;

    const infoColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
    const containerBg = theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200';

    return (
        <div className="max-w-4xl mx-auto py-10 px-6 sm:px-4">
            <h1 className="text-4xl font-extrabold mb-8 text-center">Employee Details</h1>

            <div className={`rounded-lg p-8 shadow-lg border ${containerBg}`}>
                <div className="grid sm:grid-cols-2 gap-8 mb-8">
                    <div>
                        <div className="mb-6 flex justify-center sm:justify-start">
                            <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center overflow-hidden">
                                <Image
                                    src={user.image || 'https://via.placeholder.com/150'}
                                    alt={`${user.firstName} ${user.lastName}`}
                                    className="rounded-full object-cover"
                                    width={64}
                                    height={64}
                                />
                            </div>
                        </div>


                        <p className={`font-semibold text-lg ${infoColor}`}>Name:</p>
                        <p className={`text-xl font-medium ${infoColor}`}>{user.firstName} {user.lastName}</p>

                        <p className={`font-semibold mt-4 ${infoColor}`}>Email:</p>
                        <a href={`mailto:${user.email}`} className={`text-blue-600 hover:underline block ${infoColor}`}>
                            {user.email}
                        </a>

                        <p className={`font-semibold mt-4 ${infoColor}`}>Phone:</p>
                        <a href={`tel:${user.phone}`} className={`hover:underline block ${infoColor}`}>
                            {user.phone}
                        </a>

                        <p className={`font-semibold mt-4 ${infoColor}`}>Address:</p>
                        <address className={`${infoColor} not-italic`}>
                            {user.address?.address ?? 'N/A'}, {user.address?.city ?? 'N/A'}
                        </address>
                    </div>

                    <div>
                        <p className={`font-semibold text-lg ${infoColor}`}>Department:</p>
                        <p className={`text-xl font-medium ${infoColor}`}>{user.department}</p>

                        <p className={`font-semibold mt-6 ${infoColor}`}>Performance Rating:</p>
                        <Rating value={user.performanceRating} />

                        <p className={`font-semibold mt-6 ${infoColor}`}>Status:</p>
                        <StatusBadge rating={user.performanceRating} />
                    </div>
                </div>

                <section aria-label="Employee information tabs">
                    <div
                        role="tablist"
                        aria-label="Employee detail sections"
                        className="flex space-x-6 border-b border-gray-300 dark:border-gray-500 pb-3"
                    >
                        {tabs.map(tab => (
                            <TabButton
                                key={tab}
                                label={tab}
                                active={activeTab === tab}
                                onClick={() => setActiveTab(tab)}
                                role="tab"
                                aria-selected={activeTab === tab}
                                tabIndex={activeTab === tab ? 0 : -1}
                                className="cursor-pointer"
                            />
                        ))}
                    </div>

                    <div className="mt-6 min-h-[200px]">
                        {activeTab === 'Overview' && (
                            <section aria-labelledby="overview-title" tabIndex={0}>
                                <h3 id="overview-title" className="text-2xl font-semibold mb-3">Bio</h3>
                                <p className={infoColor}>
                                    {user.firstName} is a valued member of the {user.department} department, contributing with excellent professionalism and work ethic.
                                </p>

                                <h3 className="text-2xl font-semibold mt-8 mb-3">Past Performance</h3>
                                <ul className="space-y-3">
                                    {history.map(({ year, rating }, index) => (
                                        <li key={index} className="flex justify-between items-center">
                                            <span className={infoColor}>{year}</span>
                                            <Rating value={rating} size="sm" />
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {activeTab === 'Projects' && (
                            <section aria-labelledby="projects-title" tabIndex={0}>
                                <h3 id="projects-title" className="text-2xl font-semibold mb-3">Projects</h3>
                                <ul className="list-disc ml-6 space-y-2">
                                    <li className={infoColor}>Project Apollo – Frontend Revamp</li>
                                    <li className={infoColor}>HR Automation – Phase 2</li>
                                    <li className={infoColor}>Internal Dashboard UI Upgrade</li>
                                </ul>
                            </section>
                        )}

                        {activeTab === 'Feedback' && (
                            <section aria-labelledby="feedback-title" tabIndex={0}>
                                <h3 id="feedback-title" className="text-2xl font-semibold mb-3">Feedback</h3>
                                <blockquote className={`${infoColor} italic border-l-4 border-blue-400 pl-4`}>
                                    "{user.firstName} is punctual, detail-oriented, and consistently exceeds expectations in all assigned tasks."
                                </blockquote>
                            </section>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
