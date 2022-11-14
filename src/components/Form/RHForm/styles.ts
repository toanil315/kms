import styled from "@emotion/styled";

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const Title = styled.h1`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  line-height: ${({ theme }) => theme.lineHeights.xl};
  text-align: center;
  margin-bottom: 10px;
`;
