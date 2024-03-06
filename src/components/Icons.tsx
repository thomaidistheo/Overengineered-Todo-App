interface IconProps {
    height: string
    width: string
    color: string
}

export const IconArrowDown: React.FC<IconProps> = ({ height, width, color }) => {
    return (
        <>
            <svg fill="none" viewBox="0 0 24 24" height={height} width={width} xmlns="http://www.w3.org/2000/svg">
                <path 
                    xmlns="http://www.w3.org/2000/svg" 
                    d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
                    fill={color}
                >
                </path>
            </svg>
        </>
    )
}

export const IconArrowUp: React.FC<IconProps> = ({ height, width, color }) => {
    return (
        <>
            <svg fill="none" viewBox="0 0 24 24" height={height} width={width} xmlns="http://www.w3.org/2000/svg">
                <path 
                    xmlns="http://www.w3.org/2000/svg" 
                    d="M11.2929 7.29289C11.6834 6.90237 12.3166 6.90237 12.7071 7.29289L18.7071 13.2929C19.0976 13.6834 19.0976 14.3166 18.7071 14.7071C18.3166 15.0976 17.6834 15.0976 17.2929 14.7071L12 9.41421L6.70711 14.7071C6.31658 15.0976 5.68342 15.0976 5.29289 14.7071C4.90237 14.3166 4.90237 13.6834 5.29289 13.2929L11.2929 7.29289Z" 
                    fill={color}
                >
                </path>
            </svg>
        </>
    )
}

export const IconReturnArrow: React.FC<IconProps> = ({ height, width, color }) => {
    return (
        <>
            <svg fill="none" viewBox="0 0 24 24" height={height} width={width} xmlns="http://www.w3.org/2000/svg">
                <path 
                    xmlns="http://www.w3.org/2000/svg" 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M3 14C3 13.4477 3.44772 13 4 13L16 13C17.6569 13 19 11.6569 19 10L19 6C19 5.44771 19.4477 5 20 5C20.5523 5 21 5.44771 21 6L21 10C21 12.7614 18.7614 15 16 15L4 15C3.44772 15 3 14.5523 3 14Z" 
                    fill="currentColor"
                >
                </path>
                <path 
                    xmlns="http://www.w3.org/2000/svg" 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M3.29289 14.7071C2.90237 14.3166 2.90237 13.6834 3.29289 13.2929L7.29289 9.29289C7.68342 8.90237 8.31658 8.90237 8.70711 9.29289C9.09763 9.68342 9.09763 10.3166 8.70711 10.7071L5.41421 14L8.70711 17.2929C9.09763 17.6834 9.09763 18.3166 8.70711 18.7071C8.31658 19.0976 7.68342 19.0976 7.29289 18.7071L3.29289 14.7071Z" 
                    fill={color}    
                >
                </path>
            </svg>
        </>
    )
}