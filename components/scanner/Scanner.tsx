"use client";
import { useQrReader } from "@/hooks/useQrReader";
import { QrReaderProps } from "@/types/qr-code";

export const QrReader = ({
  videoContainerStyle,
  containerStyle,
  videoStyle,
  constraints,
  ViewFinder,
  scanDelay,
  onResult,
  videoId,
}: QrReaderProps) => {
  const reader = useQrReader({
    constraints,
    scanDelay,
    onResult,
    videoId,
  });

  return (
    <section className={`h-[400px] w-[400px]`} style={containerStyle}>
      <div
        style={{
          width: "100%",
          paddingTop: "100%",
          overflow: "hidden",
          position: "relative",
          ...videoContainerStyle,
        }}
      >
        <svg
          width="50px"
          viewBox="0 0 100 100"
          style={{
            top: 0,
            left: 0,
            zIndex: 1,
            boxSizing: "border-box",
            border: "50px solid rgba(0, 0, 0, 0.3)",
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          <path
            fill="none"
            d="M13,0 L0,0 L0,13"
            stroke="rgba(255, 0, 0, 0.5)"
            strokeWidth="5"
          />
          <path
            fill="none"
            d="M0,87 L0,100 L13,100"
            stroke="rgba(255, 0, 0, 0.5)"
            strokeWidth="5"
          />
          <path
            fill="none"
            d="M87,100 L100,100 L100,87"
            stroke="rgba(255, 0, 0, 0.5)"
            strokeWidth="5"
          />
          <path
            fill="none"
            d="M100,13 L100,0 87,0"
            stroke="rgba(255, 0, 0, 0.5)"
            strokeWidth="5"
          />
        </svg>
        <video
          muted
          id={"video"}
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "block",
            overflow: "hidden",
            position: "absolute",
            transform: constraints?.facingMode === "user" && "scaleX(-1)",
            ...videoStyle,
          }}
        />
      </div>
    </section>
  );
};

QrReader.displayName = "QrReader";
QrReader.defaultProps = {
  constraints: {
    facingMode: "environment",
  },
  videoId: "video",
  scanDelay: 500,
};
