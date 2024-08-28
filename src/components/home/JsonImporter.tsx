export const JsonImporter = () => {
  // const projects = useProjects();
  // const navigate = useNavigate();

  return <>JsonImporter</>;

  // return (
  //   <Dropzone
  //     onDrop={async (files) => {
  //       if (!files[0]) {
  //         return;
  //       }

  //       const reader = new FileReader();

  //       reader.onload = function (event) {
  //         const projectId = projects.importJSON(event.target?.result);

  //         if (projectId) {
  //           navigate(routesHelper.projectDetail(projectId));
  //         }
  //       };

  //       reader.readAsText(files[0]);
  //     }}
  //     multiple={false}
  //     className={classes.jsonImporter}
  //   >
  //     <Action
  //       title="Upload project"
  //       label="Drag and drop the testbook file here"
  //       icon={FileTypeJson}
  //       action={() => ""}
  //     />
  //   </Dropzone>
  // );
};
