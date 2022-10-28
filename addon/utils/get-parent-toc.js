export default function getPArentToc(toc, path) {
  const pathSegments = path.split('/').slice(0, -1);
  let walkPosition = { pages: toc };

  pathSegments.forEach((segment, index) => {
    const path = pathSegments.slice(0, index + 1).join('/');
    walkPosition = walkPosition.pages.find((item) => item.id === path);
  });

  return walkPosition;
}
