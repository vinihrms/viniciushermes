import { ui, type Locale } from './ui';

export function getTranslations(locale: Locale) {
	return ui[locale];
}

export type SectionKey = 'home' | 'posts' | 'books' | 'projects' | 'gallery' | 'about';

const ROUTE_MAP: Record<Locale, Record<SectionKey, string>> = {
	'pt-br': {
		home: '/',
		posts: '/posts',
		books: '/livros',
		projects: '/projetos',
		gallery: '/galeria',
		about: '/sobre',
	},
	en: {
		home: '/en',
		posts: '/en/posts',
		books: '/en/books',
		projects: '/en/projects',
		gallery: '/en/gallery',
		about: '/en/about',
	},
};

export function getSectionUrl(locale: Locale, section: SectionKey): string {
	return ROUTE_MAP[locale][section];
}

export function getItemUrl(
	locale: Locale,
	collection: 'posts' | 'books' | 'projects',
	slug: string
): string {
	return `${ROUTE_MAP[locale][collection]}/${slug}`;
}

export function getAlternateLocale(locale: Locale): Locale {
	return locale === 'pt-br' ? 'en' : 'pt-br';
}

export function getSwitchLocaleUrl(currentPath: string, currentLocale: Locale): string {
	const normalized = currentPath.replace(/\/+$/, '') || '/';

	if (currentLocale === 'pt-br') {
		if (normalized === '/') return '/en';
		if (normalized === '/posts') return '/en/posts';
		if (normalized.startsWith('/posts/')) return `/en${normalized}`;
		if (normalized === '/livros') return '/en/books';
		if (normalized.startsWith('/livros/')) return `/en/books/${normalized.slice('/livros/'.length)}`;
		if (normalized === '/projetos') return '/en/projects';
		if (normalized.startsWith('/projetos/')) return `/en/projects/${normalized.slice('/projetos/'.length)}`;
		if (normalized === '/galeria') return '/en/gallery';
		if (normalized === '/sobre') return '/en/about';
		return '/en';
	} else {
		if (normalized === '/en') return '/';
		if (normalized === '/en/posts') return '/posts';
		if (normalized.startsWith('/en/posts/')) return normalized.slice('/en'.length);
		if (normalized === '/en/books') return '/livros';
		if (normalized.startsWith('/en/books/')) return `/livros/${normalized.slice('/en/books/'.length)}`;
		if (normalized === '/en/projects') return '/projetos';
		if (normalized.startsWith('/en/projects/')) return `/projetos/${normalized.slice('/en/projects/'.length)}`;
		if (normalized === '/en/gallery') return '/galeria';
		if (normalized === '/en/about') return '/sobre';
		return '/';
	}
}

export function formatEditorialDate(date: Date, locale: Locale): string {
	return new Intl.DateTimeFormat(locale === 'pt-br' ? 'pt-BR' : 'en-US', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		timeZone: 'UTC',
	})
		.format(date)
		.replace(/\.$/, '');
}

export function extractSlugFromEntryId(id: string): string {
	// Entry ids look like "pt-br/meu-post" or "en/meu-post"
	const parts = id.split('/');
	return parts.length > 1 ? parts.slice(1).join('/') : id;
}

export function extractLocaleFromEntryId(id: string): Locale {
	return id.startsWith('en/') ? 'en' : 'pt-br';
}

export function estimateReadingTime(body: string | undefined): number {
	if (!body) return 1;
	const words = body.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
}
