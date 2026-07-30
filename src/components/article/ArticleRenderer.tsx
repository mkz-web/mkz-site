"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import { theme } from "@/lib/theme";
import Button from "@/components/Button";
import type { Article, Block, Inline } from "@/lib/articles/types";
import { ui, type Locale } from "@/lib/i18n";

/* ─── Rendu inline (mini-markdown : **gras**, [lien](url), `code`) ─── */

const InlineCode = styled.code`
  font-family: ${theme.fonts.mono};
  font-size: 0.88em;
  background: ${theme.colors.hoverSurface};
  border: 1px solid ${theme.colors.border};
  border-radius: 4px;
  padding: 1px 6px;
`;

const TextLink = styled(Link)`
  color: ${theme.colors.accentLight};
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 3px;
  &:hover { color: ${theme.colors.cta}; }
`;

const TextA = TextLink.withComponent("a");

export function renderInline(text: Inline): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /(`[^`]+`)|(\*\*[^*]+?\*\*)|(\[[^\]]+\]\([^)\s]+\))/g;
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("`")) {
      parts.push(<InlineCode key={key++}>{tok.slice(1, -1)}</InlineCode>);
    } else if (tok.startsWith("**")) {
      parts.push(<strong key={key++}>{tok.slice(2, -2)}</strong>);
    } else {
      const lm = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(tok);
      if (lm) {
        const [, label, href] = lm;
        parts.push(
          href.startsWith("/") || href.startsWith("#") ? (
            <TextLink key={key++} href={href}>{label}</TextLink>
          ) : (
            <TextA key={key++} href={href} target="_blank" rel="noopener noreferrer">{label}</TextA>
          )
        );
      } else {
        parts.push(tok);
      }
    }
    last = m.index + tok.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

/* ─── Layout ─── */

const Wrapper = styled.article`
  padding: 48px 24px 96px;
`;
const Inner = styled.div`
  max-width: 760px;
  margin: 0 auto;
`;

const Crumbs = styled.nav`
  font-family: ${theme.fonts.mono};
  font-size: 12px;
  color: ${theme.colors.textSecondary};
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;
const CrumbLink = styled(Link)`
  color: ${theme.colors.textSecondary};
  &:hover { color: ${theme.colors.accent}; text-decoration: underline; }
`;

const CategoryBadge = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  font-family: ${theme.fonts.mono};
  font-size: 11.5px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: ${theme.radius.sm};
  color: ${theme.colors.cta};
  border: 1.5px solid ${theme.colors.cta};
  &:hover { background: ${theme.colors.cta}; color: white; }
`;

const Title = styled.h1`
  font-size: 34px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.12;
  margin-top: 18px;
  color: ${theme.colors.accent};
  @media (min-width: ${theme.breakpoints.md}) { font-size: 44px; }
`;

const Lead = styled.p`
  margin-top: 16px;
  font-size: 18px;
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 20px;
  margin-top: 22px;
  padding-bottom: 24px;
  border-bottom: 2px solid ${theme.colors.borderInk};
  font-family: ${theme.fonts.mono};
  font-size: 12px;
  color: ${theme.colors.textSecondary};
`;

/* ─── Blocs ─── */

const Body = styled.div`
  font-size: 16.5px;
  line-height: 1.8;
  color: ${theme.colors.text};

  p { margin-top: 20px; }
  ul, ol { margin-top: 20px; padding-left: 26px; }
  li { margin-top: 8px; }
  li::marker { color: ${theme.colors.cta}; font-weight: 600; }
`;

const H2 = styled.h2`
  font-size: 27px;
  font-weight: 600;
  letter-spacing: -0.005em;
  line-height: 1.25;
  margin-top: 60px;
  scroll-margin-top: 96px;
  color: ${theme.colors.accent};
  @media (min-width: ${theme.breakpoints.md}) { font-size: 31px; }
`;

const H3 = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin-top: 36px;
  scroll-margin-top: 96px;
  color: ${theme.colors.text};
`;

const TldrBox = styled.aside`
  margin-top: 32px;
  padding: 24px 28px;
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.accent};
  color: white;
  ul { margin-top: 12px; padding-left: 22px; }
  li { margin-top: 8px; line-height: 1.65; font-size: 15px; }
  li::marker { color: ${theme.colors.cta}; }
  a { color: white; }
`;
const TldrTitle = styled.p`
  font-family: ${theme.fonts.mono};
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.85);
`;

const TocBox = styled.nav`
  margin-top: 24px;
  padding: 20px 24px;
  border-radius: ${theme.radius.lg};
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.surfaceAlt};
  font-size: 14px;
  ol { padding-left: 22px; margin-top: 8px; }
  li { margin-top: 6px; }
  a { color: ${theme.colors.textSecondary}; }
  a:hover { color: ${theme.colors.accent}; text-decoration: underline; }
`;
const TocTitle = styled.p`
  font-family: ${theme.fonts.mono};
  font-size: 11.5px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${theme.colors.text};
`;

// Couleurs seules : les libellés des encadrés sont localisés
// (ui[locale].article.callouts).
const calloutStyles = {
  retenir: { border: theme.colors.accent, bg: `${theme.colors.accent}0A` },
  astuce: { border: theme.colors.success, bg: "#1E7A4F12" },
  attention: { border: theme.colors.cta, bg: `${theme.colors.cta}0D` },
  definition: { border: theme.colors.accentLight, bg: `${theme.colors.accentLight}0D` },
} as const;

const CalloutBox = styled.aside<{ variant: keyof typeof calloutStyles }>`
  margin-top: 24px;
  padding: 18px 22px;
  border-radius: ${theme.radius.md};
  border-left: 4px solid ${({ variant }) => calloutStyles[variant].border};
  background: ${({ variant }) => calloutStyles[variant].bg};
  font-size: 15px;
  line-height: 1.7;
  p { margin-top: 8px; }
  ul { margin-top: 8px; padding-left: 22px; }
  li { margin-top: 6px; }
`;
const CalloutTitle = styled.p`
  font-family: ${theme.fonts.mono};
  font-weight: 500;
  font-size: 11.5px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 0 !important;
`;

const TableWrap = styled.div`
  margin-top: 24px;
  overflow-x: auto;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.md};
`;
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14.5px;
  background: ${theme.colors.surface};
  caption { caption-side: bottom; padding: 10px; font-size: 12.5px; color: ${theme.colors.textSecondary}; }
  th { background: ${theme.colors.accent}; color: white; text-align: left; padding: 12px 16px; font-weight: 600; white-space: nowrap; }
  td { padding: 12px 16px; border-top: 1px solid ${theme.colors.border}; vertical-align: top; line-height: 1.6; }
  tr:nth-of-type(even) td { background: ${theme.colors.surfaceAlt}; }
`;

const Figure = styled.figure`
  margin-top: 28px;
  figcaption { margin-top: 10px; font-size: 13px; color: ${theme.colors.textSecondary}; text-align: center; }
`;
const Placeholder = styled.div`
  border: 1.5px dashed ${theme.colors.textSecondary};
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.surfaceAlt};
  padding: 44px 24px;
  text-align: center;
  color: ${theme.colors.textSecondary};
  font-family: ${theme.fonts.mono};
  font-size: 12.5px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;
const ShotImg = styled.img`
  width: 100%;
  border-radius: ${theme.radius.lg};
  border: 1px solid ${theme.colors.border};
  box-shadow: ${theme.shadows.md};
`;

const QuoteBlock = styled.blockquote`
  margin-top: 28px;
  padding: 4px 24px;
  border-left: 4px solid ${theme.colors.cta};
  font-style: italic;
  font-size: 17px;
  color: ${theme.colors.textSecondary};
  footer { margin-top: 8px; font-style: normal; font-size: 14px; font-weight: 600; color: ${theme.colors.text}; }
`;

const CtaCard = styled.aside`
  margin-top: 36px;
  padding: 32px;
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.dark};
  color: white;
  text-align: center;
  p { margin-top: 10px; color: rgba(255, 255, 255, 0.75); font-size: 15px; a { color: white; } }
`;
const CtaTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin-top: 0 !important;
  color: white !important;
`;
const CtaButtonRow = styled.div`margin-top: 20px;`;

const CodeBlock = styled.pre`
  margin-top: 24px;
  padding: 18px 22px;
  border-radius: ${theme.radius.md};
  background: ${theme.colors.dark};
  color: #ece5d8;
  font-family: ${theme.fonts.mono};
  font-size: 13.5px;
  line-height: 1.7;
  overflow-x: auto;
`;

/* ─── FAQ ─── */

const FaqSection = styled.section`margin-top: 56px;`;
const FaqItem = styled.details`
  margin-top: 12px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.md};
  background: ${theme.colors.surface};
  overflow: hidden;
  summary {
    padding: 16px 20px;
    font-weight: 600;
    font-size: 15.5px;
    cursor: pointer;
    list-style: none;
    display: flex;
    justify-content: space-between;
    gap: 12px;
    &::-webkit-details-marker { display: none; }
    &::after { content: "+"; color: ${theme.colors.cta}; font-weight: 700; font-size: 18px; }
  }
  &[open] summary::after { content: "−"; }
  p { padding: 0 20px 16px; font-size: 15px; line-height: 1.7; color: ${theme.colors.textSecondary}; margin-top: 0; }
`;

/* ─── Auteur + articles liés ─── */

const AuthorBox = styled.aside`
  margin-top: 56px;
  padding: 24px;
  border-radius: ${theme.radius.lg};
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface};
  display: flex;
  gap: 20px;
  align-items: flex-start;
  img { width: 64px; height: 64px; border-radius: ${theme.radius.full}; object-fit: cover; flex-shrink: 0; }
`;
const AuthorName = styled.p`
  font-weight: 700;
  font-size: 15px;
  margin-top: 0 !important;
`;
const AuthorRole = styled.p`
  font-size: 13px;
  color: ${theme.colors.cta};
  font-weight: 600;
  margin-top: 2px !important;
`;
const AuthorBio = styled.p`
  font-size: 14px;
  line-height: 1.7;
  color: ${theme.colors.textSecondary};
  margin-top: 8px !important;
  a { color: ${theme.colors.accentLight}; text-decoration: underline; text-underline-offset: 3px; }
`;

const RelatedSection = styled.section`margin-top: 56px;`;
const RelatedGrid = styled.div`
  display: grid;
  gap: 16px;
  margin-top: 20px;
  @media (min-width: ${theme.breakpoints.sm}) { grid-template-columns: repeat(2, 1fr); }
`;
const RelatedCard = styled(Link)`
  display: block;
  padding: 20px;
  border-radius: ${theme.radius.md};
  border: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface};
  transition: all 0.2s;
  &:hover { border-color: ${theme.colors.cta}66; box-shadow: ${theme.shadows.md}; transform: translateY(-2px); }
`;
const RelatedTag = styled.span`
  font-family: ${theme.fonts.mono};
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${theme.colors.cta};
`;
const RelatedTitle = styled.span`
  display: block;
  margin-top: 8px;
  font-weight: 600;
  font-size: 15px;
  line-height: 1.4;
  color: ${theme.colors.text};
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.01em;
`;

/* ─── Rendu d'un bloc ─── */

function renderBlock(block: Block, key: number, locale: Locale): React.ReactNode {
  switch (block.type) {
    case "p":
      return <p key={key}>{renderInline(block.text)}</p>;
    case "h2":
      return <H2 key={key} id={block.id}>{block.text}</H2>;
    case "h3":
      return <H3 key={key} id={block.id}>{block.text}</H3>;
    case "ul":
      return <ul key={key}>{block.items.map((it, i) => <li key={i}>{renderInline(it)}</li>)}</ul>;
    case "ol":
      return <ol key={key}>{block.items.map((it, i) => <li key={i}>{renderInline(it)}</li>)}</ol>;
    case "table":
      return (
        <TableWrap key={key}>
          <StyledTable>
            {block.caption && <caption>{block.caption}</caption>}
            <thead>
              <tr>{block.headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>{row.map((cell, j) => <td key={j}>{renderInline(cell)}</td>)}</tr>
              ))}
            </tbody>
          </StyledTable>
        </TableWrap>
      );
    case "callout": {
      return (
        <CalloutBox key={key} variant={block.variant}>
          <CalloutTitle>
            {block.title ?? ui[locale].article.callouts[block.variant]}
          </CalloutTitle>
          {block.text && <p>{renderInline(block.text)}</p>}
          {block.items && <ul>{block.items.map((it, i) => <li key={i}>{renderInline(it)}</li>)}</ul>}
        </CalloutBox>
      );
    }
    case "screenshot":
      return (
        <Figure key={key}>
          {block.src ? (
            <ShotImg src={block.src} alt={block.alt} loading="lazy" />
          ) : (
            <Placeholder role="img" aria-label={block.alt}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", margin: "0 auto 10px" }} aria-hidden>
                <path d="M14.5 4h-5L7.5 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.5l-2-3z" />
                <circle cx="12" cy="13" r="3.5" />
              </svg>
              {locale === "en" ? "Screenshot coming soon" : "Capture d’écran à venir"}
            </Placeholder>
          )}
          <figcaption>{block.caption}</figcaption>
        </Figure>
      );
    case "quote":
      return (
        <QuoteBlock key={key}>
          {locale === "en" ? `“${block.text}”` : `« ${block.text} »`}
          {block.author && <footer>{block.author}</footer>}
        </QuoteBlock>
      );
    case "cta":
      return (
        <CtaCard key={key}>
          <CtaTitle>{block.title}</CtaTitle>
          <p>{renderInline(block.text)}</p>
          <CtaButtonRow>
            <Button href={block.href}>{block.button}</Button>
          </CtaButtonRow>
        </CtaCard>
      );
    case "code":
      return <CodeBlock key={key}>{block.code}</CodeBlock>;
  }
}

/* ─── Sous-composants réutilisables (pages piliers) ─── */

export function BlocksRenderer({
  blocks,
  locale = "fr",
}: {
  blocks: Block[];
  locale?: Locale;
}) {
  return <Body>{blocks.map((b, i) => renderBlock(b, i, locale))}</Body>;
}

export function FaqList({ faq }: { faq: { q: string; a: string }[] }) {
  return (
    <>
      {faq.map((f, i) => (
        <FaqItem key={i}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </FaqItem>
      ))}
    </>
  );
}

/* ─── Composant principal ─── */

export interface RelatedLink {
  title: string;
  url: string;
  categoryName: string;
}

export interface ArticleRendererProps {
  article: Article;
  categoryName: string;
  categoryUrl: string;
  datePublishedLabel: string;
  dateModifiedLabel: string;
  related: RelatedLink[];
  author: { name: string; role: string; bio: string; image: string; href: string };
  locale?: Locale;
}

export default function ArticleRenderer({
  article,
  categoryName,
  categoryUrl,
  datePublishedLabel,
  dateModifiedLabel,
  related,
  author,
  locale = "fr",
}: ArticleRendererProps) {
  const t = ui[locale].article;
  const tocEntries = article.blocks.filter(
    (b): b is Extract<Block, { type: "h2" }> => b.type === "h2"
  );

  return (
    <Wrapper>
      <Inner>
        <Crumbs aria-label={t.breadcrumbAria}>
          <CrumbLink href={locale === "en" ? "/en/" : "/"}>{t.home}</CrumbLink>
          <span>›</span>
          <CrumbLink href={t.hubHref}>{t.hub}</CrumbLink>
          <span>›</span>
          <CrumbLink href={categoryUrl}>{categoryName}</CrumbLink>
        </Crumbs>

        <CategoryBadge href={categoryUrl}>{categoryName}</CategoryBadge>
        <Title>{article.title}</Title>
        <Lead>{renderInline(article.excerpt)}</Lead>
        <MetaRow>
          <span>{author.name}</span>
          <span>{t.published} {datePublishedLabel}</span>
          {dateModifiedLabel !== datePublishedLabel && (
            <span>{t.updated} {dateModifiedLabel}</span>
          )}
          <span>{article.readingMinutes} {t.readingSuffix}</span>
        </MetaRow>

        <TldrBox>
          <TldrTitle>{t.tldrTitle(article.tldr.length)}</TldrTitle>
          <ul>
            {article.tldr.map((x, i) => <li key={i}>{renderInline(x)}</li>)}
          </ul>
        </TldrBox>

        {tocEntries.length >= 3 && (
          <TocBox aria-label={t.tocTitle}>
            <TocTitle>{t.tocTitle}</TocTitle>
            <ol>
              {tocEntries.map((h) => (
                <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>
              ))}
            </ol>
          </TocBox>
        )}

        <Body>{article.blocks.map((b, i) => renderBlock(b, i, locale))}</Body>

        {article.faq.length > 0 && (
          <FaqSection id="faq">
            <SectionTitle>{t.faqTitle}</SectionTitle>
            {article.faq.map((f, i) => (
              <FaqItem key={i}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </FaqItem>
            ))}
          </FaqSection>
        )}

        <AuthorBox>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={author.image} alt={author.name} width={64} height={64} />
          <div>
            <AuthorName>{author.name}</AuthorName>
            <AuthorRole>{author.role}</AuthorRole>
            <AuthorBio>
              {author.bio} <Link href={author.href}>{t.authorMore}</Link>
            </AuthorBio>
          </div>
        </AuthorBox>

        {related.length > 0 && (
          <RelatedSection>
            <SectionTitle>{t.relatedTitle}</SectionTitle>
            <RelatedGrid>
              {related.map((r) => (
                <RelatedCard key={r.url} href={r.url}>
                  <RelatedTag>{r.categoryName}</RelatedTag>
                  <RelatedTitle>{r.title}</RelatedTitle>
                </RelatedCard>
              ))}
            </RelatedGrid>
          </RelatedSection>
        )}
      </Inner>
    </Wrapper>
  );
}
