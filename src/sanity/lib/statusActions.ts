import { useDocumentOperation, type DocumentActionComponent } from "sanity";

const STATUS_TYPES = new Set(["product", "socialLink"]);

export const PublishStatusAction: DocumentActionComponent = (props) => {
  const { id, type, draft, published, onComplete } = props;
  const { patch } = useDocumentOperation(id, type);

  if (!STATUS_TYPES.has(type)) return null;

  const doc = draft || published;
  if (!doc) return null;

  const status = (doc as { status?: string }).status;
  if (status === "published") return null;

  return {
    label: "Publish",
    onHandle: () => {
      patch.execute([{ set: { status: "published" } }]);
      onComplete();
    },
  };
};

export const UnpublishStatusAction: DocumentActionComponent = (props) => {
  const { id, type, draft, published, onComplete } = props;
  const { patch } = useDocumentOperation(id, type);

  if (!STATUS_TYPES.has(type)) return null;

  const doc = draft || published;
  if (!doc) return null;

  const status = (doc as { status?: string }).status;
  if (status !== "published") return null;

  return {
    label: "Unpublish",
    onHandle: () => {
      patch.execute([{ set: { status: "unpublished" } }]);
      onComplete();
    },
  };
};
