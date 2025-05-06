"use client";

import { useEditor, EditorContent, Editor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import UnderlineExtension from "@tiptap/extension-underline";
import LinkExtension from "@tiptap/extension-link";
import { Button } from "../ui/button";
import {
    Bold,
    Code,
    CodeSquare,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    Italic,
    List,
    ListOrdered,
    Minus,
    Quote,
    Strikethrough,
    Underline,
    Link as LinkIcon,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useCallback, useEffect } from "react";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";

function MenuBar({ editor }: { editor: Editor }) {
    const editorState = useEditorState({
        editor,
        selector: ({ editor }) => ({
            isBold: editor.isActive("bold"),
            isItalic: editor.isActive("italic"),
            isStrike: editor.isActive("strike"),
            isBlockquote: editor.isActive("blockquote"),
            isCode: editor.isActive("code"),
            isCodeBlock: editor.isActive("codeBlock"),
            isUnderLine: editor.isActive("underline"),
            isOrderedList: editor.isActive("orderedList"),
            isBulletList: editor.isActive("bulletList"),
            isHeading1: editor.isActive("heading", { level: 1 }),
            isHeading2: editor.isActive("heading", { level: 2 }),
            isHeading3: editor.isActive("heading", { level: 3 }),
            isHeading4: editor.isActive("heading", { level: 4 }),
            isHeading5: editor.isActive("heading", { level: 5 }),
            isHeading6: editor.isActive("heading", { level: 6 }),
            isLink: editor.isActive("link"),
        }),
    });
    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("Enter URL", previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();

            return;
        }

        // update link
        try {
            editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        } catch (e) {
            alert((e as Error).message);
        }
    }, [editor]);

    return (
        <div className="flex gap-3">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            type="button"
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            disabled={!editor.can().chain().focus().toggleBlockquote().run()}
                            variant={editorState.isBlockquote ? "default" : "outline"}
                        >
                            <Quote />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Quote</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            type="button"
                            onClick={() => editor.chain().focus().toggleCode().run()}
                            disabled={!editor.can().chain().focus().toggleCode().run()}
                            variant={editorState.isCode ? "default" : "outline"}
                        >
                            <Code />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Code</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            type="button"
                            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                            disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
                            variant={editorState.isCodeBlock ? "default" : "outline"}
                        >
                            <CodeSquare />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>CodeBlock</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            type="button"
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            disabled={!editor.can().chain().focus().toggleBold().run()}
                            variant={editorState.isBold ? "default" : "outline"}
                        >
                            <Bold />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Bold</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            type="button"
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            disabled={!editor.can().chain().focus().toggleItalic().run()}
                            variant={editorState.isItalic ? "default" : "outline"}
                        >
                            <Italic />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Italic</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            type="button"
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            disabled={!editor.can().chain().focus().toggleUnderline().run()}
                            variant={editorState.isUnderLine ? "default" : "outline"}
                        >
                            <Underline />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Underline</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            type="button"
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            disabled={!editor.can().chain().focus().toggleStrike().run()}
                            variant={editorState.isStrike ? "default" : "outline"}
                        >
                            <Strikethrough />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Strike Through</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            type="button"
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            disabled={!editor.can().chain().focus().toggleOrderedList().run()}
                            variant={editorState.isOrderedList ? "default" : "outline"}
                        >
                            <ListOrdered />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Ordered List</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            type="button"
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            disabled={!editor.can().chain().focus().toggleBulletList().run()}
                            variant={editorState.isBulletList ? "default" : "outline"}
                        >
                            <List />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Unordered List</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            type="button"
                            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            disabled={!editor.can().chain().focus().toggleHeading({ level: 1 }).run()}
                            variant={editorState.isHeading1 ? "default" : "outline"}
                        >
                            <Heading1 />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Heading 1</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            type="button"
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run()}
                            variant={editorState.isHeading2 ? "default" : "outline"}
                        >
                            <Heading2 />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Heading 2</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            type="button"
                            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                            disabled={!editor.can().chain().focus().toggleHeading({ level: 3 }).run()}
                            variant={editorState.isHeading3 ? "default" : "outline"}
                        >
                            <Heading3 />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Heading 3</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            type="button"
                            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                            disabled={!editor.can().chain().focus().toggleHeading({ level: 4 }).run()}
                            variant={editorState.isHeading4 ? "default" : "outline"}
                        >
                            <Heading4 />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Heading 4</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            type="button"
                            onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                            disabled={!editor.can().chain().focus().toggleHeading({ level: 5 }).run()}
                            variant={editorState.isHeading5 ? "default" : "outline"}
                        >
                            <Heading5 />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Heading 5</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            type="button"
                            onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                            disabled={!editor.can().chain().focus().toggleHeading({ level: 6 }).run()}
                            variant={editorState.isHeading6 ? "default" : "outline"}
                        >
                            <Heading6 />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Heading 6</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button type="button" onClick={setLink} variant={editorState.isLink ? "default" : "outline"}>
                            <LinkIcon />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Link</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            type="button"
                            onClick={() => editor.chain().focus().setHorizontalRule().run()}
                            disabled={!editor.can().chain().focus().setHorizontalRule().run()}
                            variant="outline"
                        >
                            <Minus />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Horizontal Rule</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}

export default function Tiptap({
    value,
    onChange,
    invalid,
}: ControllerRenderProps<
    {
        content: string;
        title: string;
        author: string;
    },
    "content"
> &
    ControllerFieldState) {
    const editor = useEditor({
        extensions: [StarterKit, HorizontalRule, UnderlineExtension, LinkExtension],
        content: value,
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
    });

    useEffect(() => {
        if (editor && editor.getHTML() !== value) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    if (!editor) {
        return null;
    }

    return (
        <div>
            <MenuBar editor={editor} />
            <div
                className={`mt-4 border ${
                    invalid ? "!border-destructive has-[.ProseMirror-focused]:!ring-destructive/20" : "border-input"
                } bg-input/30 rounded-md p-4 has-[.ProseMirror-focused]:border-ring has-[.ProseMirror-focused]:ring-ring/50 has-[.ProseMirror-focused]:ring-[3px] [&_.ProseMirror]:focus-visible:outline-0 transition-[color,box-shadow]`}
            >
                <EditorContent className=" prose prose-invert max-w-[unset]" editor={editor} />
            </div>
        </div>
    );
}
