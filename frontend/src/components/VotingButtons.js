import React, { useState } from 'react';
import styled from 'styled-components';
import { Badge } from 'react-bootstrap';
import { ButtonsHorizontalWrapper, ButtonOutlineGhost } from '../styledComponents';

// Importing the new button styles
import { ButtonOutlinePrimaryGreen, ButtonOutlinePrimaryRed } from '../styledComponents';

import thumbsUp from '../assets/icons/name=carbon_thumbs-up.svg';
import thumbsUpFilled from '../assets/icons/name=carbon_thumbs-up-filled.svg';
import thumbsDown from '../assets/icons/name=carbon_thumbs-down.svg';
import thumbsDownFilled from '../assets/icons/name=carbon_thumbs-down-filled.svg';

const BadgeContainer = styled.img`
    background: none;
    filter: ${(props) => (props.color ? `brightness(0) saturate(100%) ${props.color}` : 'none')};
`;

const StyledBadge = styled(Badge)`
    background-color: transparent !important;
    border: none !important;
    padding: 0;
    margin-right: 8px;
    display: inline-block;
    align-items: center;
    transform: translateX(-50%);
`;

const VotingButtons = () => {
    const [selectedButton, setSelectedButton] = useState(null);

    const handleClick = (button) => {
        setSelectedButton(button);
    };

    const getIconColor = () => {
        if (selectedButton === 'disagree') return 'var(--red)';
        if (selectedButton === 'like') return 'var(--green)';
        return null;
    };

    return (
        <ButtonsHorizontalWrapper>
            <ButtonOutlineGhost
                as={selectedButton === 'disagree' ? ButtonOutlinePrimaryRed : ButtonOutlineGhost}
                onClick={() => handleClick('disagree')}
            >
                <StyledBadge>
                    <BadgeContainer
                        src={selectedButton === 'disagree' ? thumbsDownFilled : thumbsDown}
                        alt="Disagree icon"
                        color={selectedButton === 'disagree' ? getIconColor() : null}
                    />
                </StyledBadge>
                Disagree
            </ButtonOutlineGhost>
            <ButtonOutlineGhost
                as={selectedButton === 'like' ? ButtonOutlinePrimaryGreen : ButtonOutlineGhost}
                onClick={() => handleClick('like')}
            >
                <StyledBadge>
                    <BadgeContainer
                        src={selectedButton === 'like' ? thumbsUpFilled : thumbsUp}
                        alt="Like icon"
                        color={selectedButton === 'like' ? getIconColor() : null}
                    />
                </StyledBadge>
                I Like It
            </ButtonOutlineGhost>
        </ButtonsHorizontalWrapper>
    );
};

export default VotingButtons;
