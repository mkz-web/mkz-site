"use client";

import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import Button from "./Button";

const CALENDLY = "https://calendly.com/mkz-consulting/30min";

const Section = styled.section`
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  position: relative;
  overflow: hidden;
`;

const Content = styled.div`
  max-width: 780px;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: ${theme.radius.full};
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface};
  font-size: 13px;
  color: ${theme.colors.textSecondary};
  margin-bottom: 32px;
  box-shadow: ${theme.shadows.sm};
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${theme.colors.success};
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: ${theme.colors.text};

  @media (min-width: ${theme.breakpoints.md}) {
    font-size: 56px;
  }
`;

const Highlight = styled.span`
  color: ${theme.colors.accent};
`;

const Subtitle = styled.p`
  margin-top: 24px;
  font-size: 17px;
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
  max-width: 620px;
  margin-left: auto;
  margin-right: auto;
`;

const Actions = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  @media (min-width: ${theme.breakpoints.sm}) {
    flex-direction: row;
    justify-content: center;
  }
`;

const StatsRow = styled.div`
  margin-top: 56px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
`;

const Stat = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${theme.colors.accent};
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: ${theme.colors.textSecondary};
  margin-top: 4px;
`;

export default function Hero() {
  return (
    <Section>
      <Content>
        <Badge>
          <Dot />
          +50 entreprises accompagn&eacute;es en 2025
        </Badge>

        <Title>
          Votre site web <Highlight>visible sur Google</Highlight>, enfin.
        </Title>

        <Subtitle>
          Votre visibilit&eacute;, notre mission. Fini les sites fant&ocirc;mes.
          Obtenez un site qui attire vos clients id&eacute;aux et g&eacute;n&egrave;re des leads
          pendant que vous vous concentrez sur votre m&eacute;tier.
        </Subtitle>

        <Actions>
          <Button href={CALENDLY}>R&eacute;server mon audit gratuit</Button>
          <Button href="/#methode" variant="secondary">
            D&eacute;couvrir la m&eacute;thode
          </Button>
        </Actions>

        <StatsRow>
          <Stat>
            <StatValue>20+</StatValue>
            <StatLabel>ann&eacute;es d&rsquo;expertise</StatLabel>
          </Stat>
          <Stat>
            <StatValue>97%</StatValue>
            <StatLabel>clients satisfaits</StatLabel>
          </Stat>
          <Stat>
            <StatValue>x3</StatValue>
            <StatLabel>trafic moyen g&eacute;n&eacute;r&eacute;</StatLabel>
          </Stat>
        </StatsRow>
      </Content>
    </Section>
  );
}
