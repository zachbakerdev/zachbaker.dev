import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'
import { getPayload } from 'payload'
import config from "@payload-config";

export const beforeSyncWithSearch: BeforeSync = async ({ originalDoc, searchDoc }) => {
  const payload = await getPayload({ config });

  const {
    doc: { relationTo: collection },
  } = searchDoc

  const { slug, id, categories, title, meta } = originalDoc

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    slug,
    meta: {
      ...meta,
      title: meta?.title || title,
      image: meta?.image?.id || meta?.image,
      description: meta?.description,
    },
    categories: [],
  }

  if (categories && Array.isArray(categories) && categories.length > 0) {
    // get full categories and keep a flattened copy of their most important properties
    try {
      modifiedDoc.categories = await Promise.all(categories.map(async (category: number) => {
        const { id, title } = await payload.findByID({
          collection: 'categories',
          id: category
        });

        console.log(id, title);

        return {
          relationTo: 'categories',
          id,
          title,
        }
      }));
    } catch {
      console.error(
        `Failed. Category not found when syncing collection '${collection}' with id: '${id}' to search.`,
      )
    }
  }

  return modifiedDoc
}
