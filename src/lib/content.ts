import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import { homeSections, type HomeLayoutType } from '../data/home';
import type { Locale } from '../i18n/ui';
import {
	extractLocaleFromEntryId,
	extractSlugFromEntryId,
	formatEditorialDate,
	getItemUrl,
	getSectionUrl,
	getTranslations,
	type SectionKey,
} from '../i18n/utils';

export type PostEntry = CollectionEntry<'posts'>;
export type BookEntry = CollectionEntry<'books'>;
export type ProjectEntry = CollectionEntry<'projects'>;
export type GalleryEntry = CollectionEntry<'gallery'>;

export interface LocalizedEntry<T> {
	entry: T;
	slug: string;
	isFallback: boolean;
}

export interface EditorialCardData {
	href: string;
	image: ImageMetadata;
	imageAlt: string;
	kicker: string;
	metaRight?: string;
	title: string;
	subtitle?: string;
	tags?: string[];
	mediaVariant: 'horizontal' | 'vertical' | 'book' | 'hero';
}

export interface ResolvedHomeSection {
	id: string;
	layout: HomeLayoutType;
	label?: string;
	moreHref?: string;
	cards: EditorialCardData[];
}

function dedupeByLocale<T extends { id: string; data: { draft?: boolean } }>(
	entries: T[],
	locale: Locale
): LocalizedEntry<T>[] {
	const visible = entries.filter((item) => !item.data.draft);
	const bySlug = new Map<string, { preferred?: T; fallback?: T }>();

	for (const entry of visible) {
		const entryLocale = extractLocaleFromEntryId(entry.id);
		const slug = extractSlugFromEntryId(entry.id);
		const bucket = bySlug.get(slug) ?? {};

		if (entryLocale === locale) {
			bucket.preferred = entry;
		} else if (entryLocale === 'pt-br') {
			bucket.fallback = entry;
		} else if (!bucket.fallback) {
			bucket.fallback = entry;
		}
		bySlug.set(slug, bucket);
	}

	const resolved: LocalizedEntry<T>[] = [];
	for (const [slug, bucket] of bySlug.entries()) {
		if (bucket.preferred) {
			resolved.push({ entry: bucket.preferred, slug, isFallback: false });
		} else if (bucket.fallback) {
			resolved.push({ entry: bucket.fallback, slug, isFallback: true });
		}
	}

	return resolved;
}

export async function getLocalizedPosts(locale: Locale): Promise<LocalizedEntry<PostEntry>[]> {
	const entries = await getCollection('posts');
	return dedupeByLocale(entries, locale).sort(
		(a, b) => b.entry.data.date.getTime() - a.entry.data.date.getTime()
	);
}

export async function getLocalizedBooks(locale: Locale): Promise<LocalizedEntry<BookEntry>[]> {
	const entries = await getCollection('books');
	return dedupeByLocale(entries, locale).sort((a, b) => {
		if (a.entry.data.status !== b.entry.data.status) {
			return a.entry.data.status === 'lendo' ? -1 : 1;
		}
		return b.entry.data.yearRead - a.entry.data.yearRead;
	});
}

export async function getLocalizedProjects(locale: Locale): Promise<LocalizedEntry<ProjectEntry>[]> {
	const entries = await getCollection('projects');
	return dedupeByLocale(entries, locale).sort(
		(a, b) => b.entry.data.date.getTime() - a.entry.data.date.getTime()
	);
}

export async function getGalleryItems(): Promise<GalleryEntry[]> {
	return getCollection('gallery');
}

export async function resolveHomeSections(locale: Locale): Promise<ResolvedHomeSection[]> {
	const t = getTranslations(locale);
	const [posts, books, projects, gallery] = await Promise.all([
		getLocalizedPosts(locale),
		getLocalizedBooks(locale),
		getLocalizedProjects(locale),
		getGalleryItems(),
	]);

	const postMap = new Map(posts.map((p) => [p.slug, p.entry]));
	const bookMap = new Map(books.map((b) => [b.slug, b.entry]));
	const projectMap = new Map(projects.map((p) => [p.slug, p.entry]));
	const galleryMap = new Map(gallery.map((g) => [g.data.id, g]));

	const resolved: ResolvedHomeSection[] = [];

	for (const section of homeSections) {
		const cards: EditorialCardData[] = [];

		for (const ref of section.items) {
			if (ref.collection === 'posts') {
				const entry = postMap.get(ref.slug);
				if (!entry) continue;
				cards.push({
					href: getItemUrl(locale, 'posts', ref.slug),
					image: entry.data.cover,
					imageAlt: entry.data.coverAlt,
					kicker: `${t.collectionBadges.posts} · ${entry.data.category}`,
					metaRight: formatEditorialDate(entry.data.date, locale),
					title: entry.data.title,
					subtitle: entry.data.excerpt,
					mediaVariant:
						section.layout === 'hero'
							? 'hero'
							: section.layout === 'vertical-3'
								? 'vertical'
								: 'horizontal',
				});
			} else if (ref.collection === 'books') {
				const entry = bookMap.get(ref.slug);
				if (!entry) continue;
				const statusLabel =
					entry.data.status === 'lendo' ? t.books.statusReading : t.books.statusRead;
				cards.push({
					href: getItemUrl(locale, 'books', ref.slug),
					image: entry.data.cover,
					imageAlt: entry.data.coverAlt,
					kicker: `${t.collectionBadges.books} · ${statusLabel}`,
					metaRight: String(entry.data.yearRead),
					title: entry.data.title,
					subtitle: entry.data.author,
					mediaVariant: section.layout === 'vertical-3' ? 'book' : 'horizontal',
				});
			} else if (ref.collection === 'projects') {
				const entry = projectMap.get(ref.slug);
				if (!entry) continue;
				cards.push({
					href: getItemUrl(locale, 'projects', ref.slug),
					image: entry.data.cover,
					imageAlt: entry.data.coverAlt,
					kicker: `${t.collectionBadges.projects} · ${entry.data.category}`,
					metaRight: String(entry.data.year),
					title: entry.data.title,
					subtitle: entry.data.excerpt,
					tags: entry.data.stack.slice(0, 4),
					mediaVariant:
						section.layout === 'hero'
							? 'hero'
							: section.layout === 'vertical-3'
								? 'vertical'
								: 'horizontal',
				});
			} else if (ref.collection === 'gallery') {
				const entry = galleryMap.get(ref.slug);
				if (!entry) continue;
				const title = locale === 'pt-br' ? entry.data.titlePt : entry.data.titleEn;
				const location =
					locale === 'pt-br' ? entry.data.locationPt : entry.data.locationEn;
				cards.push({
					href: `${getSectionUrl(locale, 'gallery')}#${entry.data.id}`,
					image: entry.data.image,
					imageAlt: title,
					kicker: t.collectionBadges.gallery,
					metaRight: entry.data.date,
					title,
					subtitle: location,
					mediaVariant:
						section.layout === 'hero'
							? 'hero'
							: section.layout === 'vertical-3'
								? 'vertical'
								: 'horizontal',
				});
			}
		}

		if (cards.length > 0) {
			resolved.push({
				id: section.id,
				layout: section.layout,
				label: section.labelKey ? t.home.sectionLabels[section.labelKey] : undefined,
				moreHref: section.moreSection
					? getSectionUrl(locale, section.moreSection as SectionKey)
					: undefined,
				cards,
			});
		}
	}

	return resolved;
}
