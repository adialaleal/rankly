"use client"
import type React from "react"
import { motion } from "framer-motion"

interface Step {
  name: string
  delay: number
}

interface MultiStepLoaderProps {
  steps: Step[]
}

export const MultiStepLoader: React.FC<MultiStepLoaderProps> = ({ steps }) => {
  return (
    <div className="flex space-x-2">
      {steps.map((step, index) => (
        <motion.div
          key={step.name}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: step.delay / 1000, duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          <motion.div
            initial={{ backgroundColor: "#4A5568" }}
            animate={{ backgroundColor: "#FF8C00" }}
            transition={{ delay: (step.delay + 500) / 1000, duration: 0.5 }}
            className="w-3 h-3 rounded-full"
          />
          <span className="text-sm text-white">{step.name}</span>
          {index < steps.length - 1 && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "2rem" }}
              transition={{ delay: (step.delay + 1000) / 1000, duration: 0.5 }}
              className="h-0.5 bg-rankly-primary"
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}

