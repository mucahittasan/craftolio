import { NextRequest, NextResponse } from 'next/server';
import { getUserPortfolio } from '@/features/portfolio/actions/get-user-portfolio.action';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userName: string }> },
) {
  try {
    const { userName } = await params;

    // Kullanıcının var olup olmadığını kontrol et
    const user = await prisma.user.findFirst({
      where: { username: { equals: userName, mode: 'insensitive' } },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Portfolio verilerini al
    const portfolioData = await getUserPortfolio(userName);

    if (!portfolioData) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 },
      );
    }

    // PRO plan kontrolü - portfolioData'dan alıyoruz
    if (portfolioData.plan !== 'PRO') {
      return NextResponse.json(
        { error: 'PDF download is a PRO feature' },
        { status: 403 },
      );
    }

    // HTML şablonu oluştur
    const htmlContent = generatePdfHtml(portfolioData);

    // HTML'i PDF'e çevir (basit yaklaşım - HTML döndür, tarayıcı print-to-pdf yapabilir)
    // Production için Puppeteer veya harici servis kullanılabilir

    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `attachment; filename="${userName}-portfolio.html"`,
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 },
    );
  }
}

interface PortfolioData {
  name: string | null;
  plan: string;
  profile: {
    title?: string | null;
    bio?: string | null;
    location?: string | null;
    email?: string | null;
    phone?: string | null;
    linkedin?: string | null;
    github?: string | null;
    website?: string | null;
  } | null;
  experiences: Array<{
    jobTitle: string;
    company: string;
    location?: string | null;
    startDate: Date;
    endDate?: Date | null;
    description?: string | null;
  }>;
  educations: Array<{
    school: string;
    degree: string;
    fieldOfStudy?: string | null;
    startDate: Date;
    endDate?: Date | null;
  }>;
  projects: Array<{
    name: string;
    description: string;
    url?: string | null;
    githubUrl?: string | null;
  }>;
  skills: Array<{
    name: string;
  }>;
}

function generatePdfHtml(data: PortfolioData): string {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${data.name || 'Portfolio'} - Resume</title>
      <style>
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #1a1a1a;
          padding: 40px;
          max-width: 800px;
          margin: 0 auto;
          background: white;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e5e5e5;
        }
        .name {
          font-size: 32px;
          font-weight: 700;
          color: #111;
          margin-bottom: 5px;
        }
        .title {
          font-size: 18px;
          color: #666;
          margin-bottom: 10px;
        }
        .contact-info {
          font-size: 12px;
          color: #888;
        }
        .contact-info span {
          margin: 0 10px;
        }
        .section {
          margin-bottom: 25px;
        }
        .section-title {
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #333;
          margin-bottom: 15px;
          padding-bottom: 5px;
          border-bottom: 1px solid #ddd;
        }
        .bio {
          font-size: 14px;
          color: #555;
          margin-bottom: 20px;
        }
        .item {
          margin-bottom: 15px;
        }
        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 5px;
        }
        .item-title {
          font-size: 14px;
          font-weight: 600;
          color: #222;
        }
        .item-subtitle {
          font-size: 13px;
          color: #555;
        }
        .item-date {
          font-size: 12px;
          color: #888;
        }
        .item-description {
          font-size: 13px;
          color: #666;
          margin-top: 5px;
        }
        .skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .skill-badge {
          font-size: 11px;
          padding: 4px 10px;
          background: #f0f0f0;
          border-radius: 15px;
          color: #444;
        }
        .project-links {
          font-size: 11px;
          color: #0066cc;
          margin-top: 5px;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 10px;
          color: #aaa;
        }
        .print-button {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 10px 20px;
          background: #4F46E5;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
        }
        .print-button:hover {
          background: #4338CA;
        }
        @media print {
          .print-button { display: none; }
        }
      </style>
    </head>
    <body>
      <button class="print-button" onclick="window.print()">Save as PDF</button>

      <div class="header">
        <div class="name">${data.name || 'Portfolio'}</div>
        ${data.profile?.title ? `<div class="title">${data.profile.title}</div>` : ''}
        <div class="contact-info">
          ${data.profile?.location ? `<span>📍 ${data.profile.location}</span>` : ''}
          ${data.profile?.email ? `<span>✉️ ${data.profile.email}</span>` : ''}
          ${data.profile?.phone ? `<span>📞 ${data.profile.phone}</span>` : ''}
        </div>
        <div class="contact-info" style="margin-top: 5px;">
          ${data.profile?.linkedin ? `<span>LinkedIn: ${data.profile.linkedin}</span>` : ''}
          ${data.profile?.github ? `<span>GitHub: ${data.profile.github}</span>` : ''}
          ${data.profile?.website ? `<span>Web: ${data.profile.website}</span>` : ''}
        </div>
      </div>

      ${
        data.profile?.bio
          ? `
        <div class="section">
          <div class="section-title">About</div>
          <p class="bio">${data.profile.bio.replace(/<[^>]*>/g, '')}</p>
        </div>
      `
          : ''
      }

      ${
        data.skills.length > 0
          ? `
        <div class="section">
          <div class="section-title">Skills</div>
          <div class="skills-container">
            ${data.skills.map((skill) => `<span class="skill-badge">${skill.name}</span>`).join('')}
          </div>
        </div>
      `
          : ''
      }

      ${
        data.experiences.length > 0
          ? `
        <div class="section">
          <div class="section-title">Experience</div>
          ${data.experiences
            .map(
              (exp) => `
            <div class="item">
              <div class="item-header">
                <div>
                  <div class="item-title">${exp.jobTitle}</div>
                  <div class="item-subtitle">${exp.company}${exp.location ? ` · ${exp.location}` : ''}</div>
                </div>
                <div class="item-date">${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : 'Present'}</div>
              </div>
              ${exp.description ? `<div class="item-description">${exp.description.replace(/<[^>]*>/g, '')}</div>` : ''}
            </div>
          `,
            )
            .join('')}
        </div>
      `
          : ''
      }

      ${
        data.educations.length > 0
          ? `
        <div class="section">
          <div class="section-title">Education</div>
          ${data.educations
            .map(
              (edu) => `
            <div class="item">
              <div class="item-header">
                <div>
                  <div class="item-title">${edu.school}</div>
                  <div class="item-subtitle">${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</div>
                </div>
                <div class="item-date">${formatDate(edu.startDate)} - ${edu.endDate ? formatDate(edu.endDate) : 'Present'}</div>
              </div>
            </div>
          `,
            )
            .join('')}
        </div>
      `
          : ''
      }

      ${
        data.projects.length > 0
          ? `
        <div class="section">
          <div class="section-title">Projects</div>
          ${data.projects
            .map(
              (project) => `
            <div class="item">
              <div class="item-title">${project.name}</div>
              <div class="item-description">${project.description.replace(/<[^>]*>/g, '')}</div>
              ${
                project.url || project.githubUrl
                  ? `
                <div class="project-links">
                  ${project.url ? `🔗 ${project.url}` : ''}
                  ${project.url && project.githubUrl ? ' | ' : ''}
                  ${project.githubUrl ? `GitHub: ${project.githubUrl}` : ''}
                </div>
              `
                  : ''
              }
            </div>
          `,
            )
            .join('')}
        </div>
      `
          : ''
      }

      <div class="footer">
        Generated from Craftolio • ${new Date().toLocaleDateString()}
      </div>
    </body>
    </html>
  `;
}
