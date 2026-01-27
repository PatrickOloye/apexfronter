import { XCircle, Shield, FileText } from 'lucide-react';

interface DepositRestrictedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DepositRestrictedModal = ({ isOpen, onClose }: DepositRestrictedModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-red-50 px-6 py-4 border-b border-red-100 flex items-center gap-3">
          <div className="bg-red-100 p-2 rounded-full">
            <XCircle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-red-900">Action Restricted</h2>
            <p className="text-xs text-red-600 font-medium">Regulatory Compliance Notice #402-A</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="mb-6 space-y-4">
             <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r-md text-red-800 text-xs font-mono mb-4">
                <strong>COMPLIANCE ALERT: CODE 503-AML/KYC</strong><br/>
                CROSS-BORDER SETTLEMENT PROTOCOL VIOLATION DETECTED
             </div>

             <p className="text-slate-600 text-sm leading-relaxed text-justify">
               Pursuant to <strong>Section 326 of the USA PATRIOT Act</strong> and the <strong>International Anti-Money Laundering (AML) Directive 2024</strong>, this account entity is currently restricted from receiving direct inbound liquidity (Deposits). Our automated compliance engine has flagged this ledger due to incomplete <strong>Know Your Customer (KYC)</strong> verification and pending account activation protocols.
             </p>
             
             <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                <div className="flex gap-3">
                    <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div className="text-xs text-slate-600 leading-snug">
                        <strong>Regulatory Enforcement:</strong> In accordance with <span className="font-semibold text-slate-800">31 CFR Chapter X</span>, unverified accounts are prohibited from processing automated clearing house (ACH) or wire transfers to prevent potential illicit financial flows.
                    </div>
                </div>
                <div className="flex gap-3">
                    <FileText className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <div className="text-xs text-slate-600 leading-snug">
                         <strong>Mandatory Resolution:</strong> All deposit actions must be routed through an authorized <strong>Audit Agent</strong> for manual source-of-funds verification. Please contact your account manager immediately to initiate the <strong>Manual Clearing Process (MCP)</strong>.
                    </div>
                </div>
             </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onClose}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              Acknowledge Restriction
            </button>
            <button
                className="w-full py-3 px-4 bg-white text-slate-500 hover:text-slate-700 text-xs font-medium transition-colors"
                onClick={() => window.open('https://example.com/terms', '_blank')}
            >
                View Regulatory Documents (Form 8-K)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
