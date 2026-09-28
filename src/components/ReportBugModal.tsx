import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
}

export const ReportBugModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-md w-full text-white shadow-2xl">
        <h3 className="text-xl font-bold font-audiowide mb-2">Report a Bug</h3>
        <p className="text-sm text-zinc-400 mb-6">Feedback and bug reports are stored locally in hackathon preview mode.</p>
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-medium transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReportBugModal;
