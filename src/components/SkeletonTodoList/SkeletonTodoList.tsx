import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonTodoList = () => {
    return (
        <div
            style={{
                width: '300px',
                padding: '20px',
                borderRadius: '10px',
                backgroundColor: '#c1bebe',
                marginBottom: '20px',
            }}
        >
            {/* Заголовок */}
            <Skeleton height={30} width={180} style={{marginBottom: 20}}/>

            {/* Элементы задач */}
            {[...Array(5)].map((_, index) => (
                <div
                    key={index}
                    style={{display: 'flex', alignItems: 'center', marginBottom: 12}}
                >
                    <Skeleton
                        width={20}
                        height={20}
                        style={{marginRight: 10}}
                        baseColor="#e0e0e0"
                        highlightColor="#f5f5f5"
                    />
                    <Skeleton
                        height={20}
                        width={200}
                        baseColor="#e0e0e0"
                        highlightColor="#f5f5f5"
                    />
                    <Skeleton
                        width={20}
                        height={20}
                        style={{marginLeft: 10}}
                        baseColor="#e0e0e0"
                        highlightColor="#f5f5f5"
                    />
                </div>
            ))}
            <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                <Skeleton
                    height={30}
                    width={100}
                    style={{marginTop: 10}}
                    baseColor="#e0e0e0"
                    highlightColor="#f5f5f5"
                />
                <Skeleton
                    height={30}
                    width={100}
                    style={{marginTop: 10}}
                    baseColor="#e0e0e0"
                    highlightColor="#f5f5f5"
                />
                <Skeleton
                    height={30}
                    width={100}
                    style={{marginTop: 10}}
                    baseColor="#e0e0e0"
                    highlightColor="#f5f5f5"
                />
            </div>
        </div>
    );
};
