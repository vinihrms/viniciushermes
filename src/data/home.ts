/**
 * CURADORIA DA CAPA ( / e /en )
 * -----------------------------
 * Edite este arquivo para controlar exatamente o que aparece na página inicial,
 * em qual ordem e em qual formato de bloco:
 *
 * - layout: 'horizontal-2' -> 2 blocos horizontais lado a lado (proporção 3:2)
 * - layout: 'vertical-3'   -> 3 blocos verticais lado a lado (proporção 3:4 ou 2:3 para livros)
 * - layout: 'hero'         -> 1 bloco largo de destaque (proporção 21:9)
 *
 * Em `items`, informe:
 * - collection: 'projects' | 'posts' | 'books' | 'gallery'
 * - slug: nome do arquivo .md (sem extensão e sem pt-br/ ou en/) ou `id` em gallery/items.json
 *
 * O mesmo arquivo alimenta tanto `/` (PT-BR) quanto `/en` (EN).
 */

import type { SectionKey } from '../i18n/utils';

export type HomeLayoutType = 'hero' | 'horizontal-2' | 'vertical-3';

export interface HomeItemRef {
	collection: 'posts' | 'books' | 'projects' | 'gallery';
	slug: string;
}

export interface HomeSectionConfig {
	id: string;
	layout: HomeLayoutType;
	labelKey?: 'featured' | 'readings' | 'projects' | 'gallery' | 'notes';
	moreSection?: SectionKey;
	items: HomeItemRef[];
}

export const homeSections: HomeSectionConfig[] = [
	{
		id: 'destaques',
		layout: 'horizontal-2',
		labelKey: 'featured',
		moreSection: 'projects',
		items: [
			{ collection: 'projects', slug: 'compilador-minilang' },
			{ collection: 'posts', slug: 'arquitetura-e-silencio' },
		],
	},
	{
		id: 'leituras',
		layout: 'vertical-3',
		labelKey: 'readings',
		moreSection: 'books',
		items: [
			{ collection: 'books', slug: 'o-estrangeiro' },
			{ collection: 'books', slug: 'sicp' },
			{ collection: 'books', slug: 'cidades-invisiveis' },
		],
	},
	{
		id: 'engenharia-e-notas',
		layout: 'horizontal-2',
		labelKey: 'notes',
		moreSection: 'posts',
		items: [
			{ collection: 'projects', slug: 'motor-busca-vetorial' },
			{ collection: 'posts', slug: 'estruturas-de-dados-cache' },
		],
	},
	{
		id: 'galeria-selecao',
		layout: 'vertical-3',
		labelKey: 'gallery',
		moreSection: 'gallery',
		items: [
			{ collection: 'gallery', slug: 'retrato-arquitetura-01' },
			{ collection: 'gallery', slug: 'escadaria-concreto' },
			{ collection: 'gallery', slug: 'sombra-biblioteca' },
		],
	},
];
