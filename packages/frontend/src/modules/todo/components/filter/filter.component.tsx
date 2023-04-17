import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { StyledButton } from '../../../common/components/styled/button.styled';
import { EStatus } from '../../types/status.enum';
import * as Styled from './filter.styled';

interface FilterProps {
  status: EStatus;
  onSetSearchValue: (searchValue: string) => void;
  onSetStatus: (newStatus: EStatus) => void;
}

const Filter: FC<FilterProps> = ({ status, onSetSearchValue, onSetStatus }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const debouncer = setTimeout(() => {
      onSetSearchValue(searchTerm);
    }, 500);

    return () => {
      clearTimeout(debouncer);
    };
  }, [searchTerm]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Styled.Filter>
      <form>
        <input
          type="text"
          name="searchValue"
          id="searchValue"
          placeholder="&#x1F50D; search"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </form>
      <div>
        <StyledButton
          $auto
          $active={status === EStatus.ALL}
          onClick={() => onSetStatus(EStatus.ALL)}
        >
          All
        </StyledButton>
        <StyledButton
          $auto
          $active={status === EStatus.PRIVATE}
          onClick={() => onSetStatus(EStatus.PRIVATE)}
        >
          Private
        </StyledButton>
        <StyledButton
          $auto
          $active={status === EStatus.PUBLIC}
          onClick={() => onSetStatus(EStatus.PUBLIC)}
        >
          Public
        </StyledButton>
        <StyledButton
          $auto
          $active={status === EStatus.COMPLETED}
          onClick={() => onSetStatus(EStatus.COMPLETED)}
        >
          Completed
        </StyledButton>
      </div>
    </Styled.Filter>
  );
};

export default Filter;
