import styled from "@emotion/styled";
import { Calendar } from "react-big-calendar";

export const StyledBigCalendar = styled<any>(Calendar)`
  min-height: 500px;
  height: fit-content;

  .rbc-time-header.rbc-overflowing {
    width: calc(100% - 7.8px);
  }

  .rbc-row-content {
    pointer-events: none;
  }

  .rbc-time-content {
    width: 100%;
  }

  .rbc-timeslot-group {
    min-height: 80px;
  }

  .rbc-event {
    background-color: rgba(29, 138, 181, 0.4);
    border-radius: ${({ theme }) => theme.radii.base};
    border-right: 0;
    border-top: 0;
    border-bottom: 0;
    border-left-width: 6px;
  }

  .rbc-event-label {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: ${({ theme }) => theme.colors.text};
  }

  .rbc-event-content {
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: ${({ theme }) => theme.lineHeights.medium};
  }
`;
