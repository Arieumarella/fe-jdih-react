import WebViewer from '@pdftron/webviewer';
import { useEffect, useRef } from 'react';

const LICENSE_KEY = 'demo:1756716178443:607b362f0300000000ffde8f5076d7bccf6f20419b2242eb2ea82c3a6a';

export default function WebViewerWithLicense({ initialDoc, path = '/webviewer', fullAPI = true, style = {}, ...props }) {
  const viewerRef = useRef(null);
  useEffect(() => {
    if (viewerRef.current && initialDoc) {
      WebViewer({
        path,
        initialDoc,
        fullAPI,
        licenseKey: LICENSE_KEY,
        ...props
      }, viewerRef.current);
    }
  }, [initialDoc, path, fullAPI]);
  return <div ref={viewerRef} style={{ width: '100%', height: '100%', ...style }} />;
}
