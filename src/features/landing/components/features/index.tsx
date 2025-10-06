import React from 'react';
import {
  BentoGrid,
  BentoGridItem,
} from '@/features/shared/components/ui/bento-grid';
import { FeaturesHeader } from '@/features/landing/components/features/features-header';
import {
  CustomizationPreview,
  SectionsPreview,
  ResponsivePreview,
  AIPoweredPreview,
} from '@/features/landing/components/features/feature-previews';
import { useFeatureIcon } from '@/features/landing/hooks/use-feature-icon.hook';
import {
  FEATURES_CONFIG,
  FEATURES_DATA,
} from '@/features/landing/constants/features.constant';
import { MotionSection } from '@/features/shared/utils/motions/motions.util';

const previewComponents = [
  <CustomizationPreview key="customization" />,
  <SectionsPreview key="sections" />,
  <ResponsivePreview key="responsive" />,
  <AIPoweredPreview key="ai-powered" />,
];

export function Features() {
  const { getIcon } = useFeatureIcon();

  return (
    <MotionSection id="features" className="container mx-auto px-4 py-20">
      <FeaturesHeader
        title={FEATURES_CONFIG.title}
        description={FEATURES_CONFIG.description}
      />
      <BentoGrid className="md:auto-rows-[20rem]">
        {FEATURES_DATA.map((feature, i) => (
          <BentoGridItem
            key={i}
            title={feature.title}
            description={feature.description}
            header={previewComponents[i]}
            icon={getIcon(feature.iconName)}
            className={feature.className}
            index={i}
          />
        ))}
      </BentoGrid>
    </MotionSection>
  );
}
