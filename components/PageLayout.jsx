import React from "react";
import PropTypes from "prop-types";
import BreadCrumbs from "./BreadCrumbs";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const PageLayout = ({
  title,
  subtitle,
  primaryAction,
  children,
  showBreadcrumbs = true,
  className = "",
  breadcrumbs = [],
  fullScreen = true,
}) => {
  return (
    <>
      <header className="flex flex-wrap items-center justify-between mb-4">
        <div className="flex-1">
          {title && (
            <div className="text-xl font-medium text-default-900 flex-1">
              {title}
            </div>
          )}
          {subtitle && (
            <div className="text-md text-default-600 p-1">{subtitle}</div>
          )}
        </div>
        {showBreadcrumbs && (
          <div className="flex-none p-1">
            <BreadCrumbs items={breadcrumbs} />
          </div>
        )}
      </header>

      <main className={`${fullScreen && "min-h-[90vh]"} flex`}>
        <Card className={cn("flex-1 sm:p-4 p-3", className)}>
          {/* PRIMARY BTN */}
          <div>{primaryAction && <div>{primaryAction}</div>}</div>

          {children}
        </Card>
      </main>
    </>
  );
};

PageLayout.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  primaryAction: PropTypes.node,
  children: PropTypes.node.isRequired,
  showBreadcrumbs: PropTypes.bool,
  breadcrumbs: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  fullScreen: PropTypes.string,
};

export default PageLayout;
