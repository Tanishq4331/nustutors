import { createStyles, makeStyles } from "@material-ui/core/styles";
import { DropzoneArea } from "material-ui-dropzone";
import { Card } from "react-bootstrap";

export default function UploadDocuments({ formState, setFormState }) {
  const useStyles = makeStyles((theme) =>
    createStyles({
      previewChip: {
        minWidth: 160,
        maxWidth: 210,
      },
    })
  );

  const classes = useStyles();

  const addFiles = (files) => {
    console.log("adding files");
    setFormState({
      ...formState,
      documents: formState.documents.concat(files),
    });
  };

  const deleteFile = (file) => {
    console.log("deleting files");
    setFormState({
      ...formState,
      documents: formState.documents.filter((doc) => doc.name !== file.name),
    });
  };

  return (
    <Card className="mb-5">
      <Card.Header>
        <strong> Upload Documents </strong>
      </Card.Header>
      <Card.Body>
        <div className="mb-4">
          You are STRONGLY encouraged to upload the transcripts containing the
          grades for the modules you have declared. Tutors who have provided us with
          supporting documents will earn a verified certificate that will be
          displayed on their profile.
        </div>
        Note: Limit of 5 files (image or PDF files, each with ~7MB file size
        limit)
        <DropzoneArea
          showPreviews={true}
          showPreviewsInDropzone={false}
          filesLimit={5}
          maxFileSize={7000000}
          useChipsForPreview
          previewGridProps={{ container: { spacing: 1, direction: "row" } }}
          previewChipProps={{ classes: { root: classes.previewChip } }}
          previewText="Selected files"
          onDrop={addFiles}
          onDelete={deleteFile}
          acceptedFiles={["image/*", ".pdf"]}
        />
      </Card.Body>
    </Card>
  );
}
