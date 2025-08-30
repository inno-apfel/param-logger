import { 
    AlignLeft, 
    AlignCenter, 
    AlignRight 
} from 'lucide-react';
import { 
    NodeViewWrapper, 
    ReactNodeViewRenderer 
} from '@tiptap/react';
import { 
    ResizableImage, 
    ResizableImageComponent, 
    type ResizableImageNodeViewRendererProps 
} from 'tiptap-extension-resizable-image';

import { Button } from '@/components/ui/button';
import { 
    Popover, 
    PopoverTrigger, 
    PopoverContent 
} from '@/components/ui/popover';

const NodeView = (props: ResizableImageNodeViewRendererProps) => {
  const editor = props.editor;

  const setTextAlign = (textAlign: string) => {
    editor.chain().focus().setTextAlign(textAlign).run();
  };

  return (
    <NodeViewWrapper className="image-component" data-drag-handle>
      <Popover>
        <PopoverTrigger asChild>
          <div className="relative">
            <ResizableImageComponent {...props} />
          </div>
        </PopoverTrigger>
        <PopoverContent side="top" align="center" className="absolute top-2 left-1/2 transform -translate-x-1/2 flex gap-2 p-1 rounded w-33.5 shadow-none">
          <Button className="stroke-black hover:stroke-primary" variant="ghost" size="sm" onClick={() => setTextAlign('left')}>
            <AlignLeft color=""/>
          </Button>
          <Button className="stroke-black hover:stroke-primary" variant="ghost" size="sm" onClick={() => setTextAlign('center')}>
            <AlignCenter color=""/>
          </Button>
          <Button className="stroke-black hover:stroke-primary" variant="ghost" size="sm" onClick={() => setTextAlign('right')}>
            <AlignRight color=""/>
          </Button>
        </PopoverContent>
      </Popover>
    </NodeViewWrapper>
  );
};

export const ResizableAlignableImage = ResizableImage.extend({
  addNodeView() {
    return ReactNodeViewRenderer((props) =>
      NodeView(props as unknown as ResizableImageNodeViewRendererProps)
    );
  },
});